import React, { useState, Fragment } from "react";
import { useSprings, animated, interpolate } from "react-spring";
import { useDrag } from "react-use-gesture";
import { Card } from "./Card";
import { ProfileModal } from "./ProfileModal";
import { data } from "../data";

const to = (i) => ({
  x: 0,
  y: 0,
  scale: 1,
  rot: 0,
  delay: i * 100,
});

const from = (i) => ({ rot: 0, scale: 1.5, x: 0, y: -1000 });

const trans = (r, s) =>
  `rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

export const Deck = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [gone] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(data.length - gone.size - 1);

  const [props, set] = useSprings(data.length, (i) => {
    return {
      ...to(i),
      from: from(i),
    };
  });

  function handleNope() {
    cardSwipe(-1);
  }

  function handleLike() {
    cardSwipe(1);
  }

  function handleProfile() {
    setShowProfile(true);
  }

  function cardSwipe(direction) {
    const index = data.length - gone.size - 1;
    gone.add(index);
    setCurrentIndex(currentIndex - 1);
    const dir = direction;
    const velocity = 0.3;
    const mx = 4000;
    set((i) => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = (200 + window.innerWidth) * dir;
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = 1;
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: 500 },
      };
    });

    if (gone.size === data.length) {
      setTimeout(() => gone.clear() || set((i) => to(i)), 300);
      setCurrentIndex(data.length - 1);
    }
  }

  const bind = useDrag(
    ({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
      const trigger = velocity > 0.2;
      const dir = xDir < 0 ? -1 : 1;
      if (!down && trigger) {
        gone.add(index);
        setCurrentIndex(currentIndex - 1);
      }
      set((i) => {
        if (index !== i) return;
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
        const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0);
        const scale = down ? 1.1 : 1;
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!down && gone.size === data.length) {
        setTimeout(() => gone.clear() || set((i) => to(i)), 300);
        setCurrentIndex(data.length - 1);
      }
    }
  );

  return (
    <Fragment>
      {showProfile ? (
        <ProfileModal
          func={setShowProfile}
          name={data[currentIndex].name}
          age={data[currentIndex].age}
          img={data[currentIndex].img}
        />
      ) : null}
      <div className="flex flex-col content-around justify-center items-center h-full max-w-lg w-full">
        <div className=" max-w-3xl w-3/4 relative flex-grow">
          {props.map(({ x, y, rot, scale }, i) => {
            const { name, age, img } = data[i];

            return (
              <animated.div
                {...bind(i)}
                className="w-full absolute "
                key={i}
                style={{
                  transform: interpolate(
                    [x, y],
                    (x, y) => `translate3d(${x}px,${y}px,0)`
                  ),
                }}
              >
                <animated.div
                  style={{
                    transform: interpolate([rot, scale], trans),
                  }}
                >
                  <Card name={name} age={age} img={img} />
                </animated.div>
              </animated.div>
            );
          })}
        </div>
        <div className="flex flex-none p-2">
          <button
            className="text-red-500 focus:outline-none m-1"
            onClick={() => handleNope()}
          >
            Nope
          </button>
          <button
            className="text-blue-500 focus:outline-none m-1"
            onClick={() => handleProfile()}
          >
            Profile
          </button>
          <button
            className="text-green-500 focus:outline-none m-1"
            onClick={() => handleLike()}
          >
            Like
          </button>
        </div>
      </div>
    </Fragment>
  );
};
