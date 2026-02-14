"use client";
import React, { useId } from "react";
import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import type { Container } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { cn } from "@/lib/utils";
import { motion, useAnimation } from "framer-motion";

type ParticlesProps = {
  id?: string;
  className?: string;
};

export const SparklesCore = (props: ParticlesProps) => {
  const { id, className } = props;
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);
  const controls = useAnimation();

  const particlesLoaded = async (container?: Container) => {
    if (container) {
      controls.start({
        opacity: 1,
        transition: {
          duration: 1,
        },
      });
    }
  };

  const generatedId = useId();
  return (
    <motion.div animate={controls} className={cn("opacity-0", className)}>
      {init && (
        <Particles
          id={id || generatedId}
          className={cn("h-full w-full")}
          particlesLoaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            fullScreen: {
              enable: true,
              zIndex: -1, // Sits in the background
            },
            interactivity: {
              events: {
                onClick: {
                  enable: false, // No gimmicks
                },
                onHover: {
                  enable: false, // No gimmicks
                },
              },
            },
            particles: {
              color: {
                value: "#94A3B8",
              },
              move: {
                direction: "none",
                enable: true,
                outModes: "out",
                random: true,
                speed: 0.1, // Subtle drift
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 800,
                  height: 800,
                },
                value: 40, // Premium, not crowded
              },
              opacity: {
                value: { min: 0.1, max: 0.25 },
                animation: {
                  enable: true,
                  speed: 1,
                  sync: false,
                },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 0.5, max: 1.2 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </motion.div>
  );
};
