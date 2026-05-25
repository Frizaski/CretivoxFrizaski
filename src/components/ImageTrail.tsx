"use client";

import { gsap } from "gsap";
import { useEffect, useRef, type RefObject } from "react";
import "./ImageTrail.css";

const MAX_VISIBLE_IMAGES = 10;
const SPAWN_DISTANCE = 60;

interface Point {
  x: number;
  y: number;
}

interface ImageTrailProps {
  items?: string[];
  interactionTargetRef?: RefObject<HTMLElement | null>;
}

function distanceBetween(first: Point, second: Point): number {
  return Math.hypot(first.x - second.x, first.y - second.y);
}

function interpolate(first: Point, second: Point, amount: number): Point {
  return {
    x: first.x + (second.x - first.x) * amount,
    y: first.y + (second.y - first.y) * amount,
  };
}

export default function ImageTrail({ items = [], interactionTargetRef }: ImageTrailProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layerCount = Math.min(items.length, MAX_VISIBLE_IMAGES);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || items.length === 0) return;
    const interactionTarget = interactionTargetRef?.current ?? container;

    const layers = Array.from(container.querySelectorAll<HTMLDivElement>(".image-trail__img"));
    const inners = layers.map((layer) => layer.querySelector<HTMLDivElement>(".image-trail__img-inner"));
    let containerRect = container.getBoundingClientRect();
    let interactionRect = interactionTarget.getBoundingClientRect();
    let lastSpawnPoint: Point | null = null;
    let trailingPoint: Point | null = null;
    let latestPointer: { x: number; y: number } | null = null;
    let activeLayer = -1;
    let activeImage = -1;
    let zIndex = 1;
    let idleCallback: number | null = null;
    const idleWindow = window as unknown as {
      requestIdleCallback?: (callback: () => void) => number;
      cancelIdleCallback?: (handle: number) => void;
    };

    const updateBounds = () => {
      containerRect = container.getBoundingClientRect();
      interactionRect = interactionTarget.getBoundingClientRect();
    };

    const preloadThumbnails = () => {
      items.slice(layerCount).forEach((source) => {
        const image = new Image();
        image.decoding = "async";
        image.src = source;
      });
    };

    const showNextImage = (point: Point, origin: Point) => {
      activeLayer = (activeLayer + 1) % layers.length;
      activeImage = (activeImage + 1) % items.length;
      zIndex += 1;

      const layer = layers[activeLayer];
      const inner = inners[activeLayer];
      if (!inner) return;

      if (inner.dataset.source !== items[activeImage]) {
        inner.style.backgroundImage = `url("${items[activeImage]}")`;
        inner.dataset.source = items[activeImage];
      }

      const halfWidth = layer.offsetWidth / 2;
      const halfHeight = layer.offsetHeight / 2;

      gsap.killTweensOf(layer);
      gsap.timeline()
        .fromTo(
          layer,
          {
            autoAlpha: 1,
            scale: 0.96,
            zIndex,
            x: origin.x - halfWidth,
            y: origin.y - halfHeight,
          },
          {
            duration: 0.4,
            ease: "power2.out",
            scale: 1,
            x: point.x - halfWidth,
            y: point.y - halfHeight,
          }
        )
        .to(layer, {
          autoAlpha: 0,
          scale: 0.3,
          duration: 0.4,
          ease: "power2.in",
        });
    };

    const processPointer = () => {
      if (!latestPointer) return;
      const point = {
        x: latestPointer.x - containerRect.left,
        y: latestPointer.y - containerRect.top,
      };

      if (!lastSpawnPoint || !trailingPoint) {
        lastSpawnPoint = point;
        trailingPoint = point;
        showNextImage(point, point);
        return;
      }

      trailingPoint = interpolate(trailingPoint, point, 0.18);
      if (distanceBetween(point, lastSpawnPoint) < SPAWN_DISTANCE) return;

      showNextImage(point, trailingPoint);
      lastSpawnPoint = point;
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (
        event.clientX < interactionRect.left ||
        event.clientX > interactionRect.right ||
        event.clientY < interactionRect.top ||
        event.clientY > interactionRect.bottom
      ) {
        resetPointer();
        return;
      }
      latestPointer = { x: event.clientX, y: event.clientY };
      processPointer();
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      if (
        touch.clientX < interactionRect.left ||
        touch.clientX > interactionRect.right ||
        touch.clientY < interactionRect.top ||
        touch.clientY > interactionRect.bottom
      ) {
        resetPointer();
        return;
      }
      latestPointer = { x: touch.clientX, y: touch.clientY };
      processPointer();
    };

    const resetPointer = () => {
      latestPointer = null;
      lastSpawnPoint = null;
      trailingPoint = null;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", resetPointer);
    window.addEventListener("scroll", updateBounds, { passive: true });
    window.addEventListener("resize", updateBounds, { passive: true });

    if (idleWindow.requestIdleCallback) {
      idleCallback = idleWindow.requestIdleCallback(preloadThumbnails);
    } else {
      idleCallback = window.setTimeout(preloadThumbnails, 250);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", resetPointer);
      window.removeEventListener("scroll", updateBounds);
      window.removeEventListener("resize", updateBounds);
      if (idleWindow.cancelIdleCallback && idleCallback !== null) {
        idleWindow.cancelIdleCallback(idleCallback);
      } else if (idleCallback !== null) {
        window.clearTimeout(idleCallback);
      }
      gsap.killTweensOf(layers);
    };
  }, [items, interactionTargetRef, layerCount]);

  return (
    <div className="image-trail" ref={containerRef}>
      {items.slice(0, layerCount).map((url) => (
        <div className="image-trail__img" key={url}>
          <div
            className="image-trail__img-inner"
            data-source={url}
            style={{ backgroundImage: `url("${url}")` }}
          />
        </div>
      ))}
    </div>
  );
}
