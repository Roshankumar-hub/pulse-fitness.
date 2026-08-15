/**
 * PULSE FITNESS™ — media registry
 * Every asset is a native 4K (UHD) source. Rendered 100% sharp:
 * no blur, no frosted glass, no faded overlays beyond 15% black.
 */

export type Clip = {
  src: string;
  poster: string;
  label: string;
};

/** Girl sprinting on a treadmill — inside the club. */
export const RUN_TREADMILL: Clip = {
  src: "https://videos.pexels.com/video-files/6286151/6286151-uhd_3840_2160_30fps.mp4",
  poster:
    "https://images.pexels.com/videos/6286151/pexels-photo-6286151.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600",
  label: "Sprint · Treadmill",
};

/** Second treadmill angle — girl running, full body, indoor floor. */
export const RUN_TREADMILL_2: Clip = {
  src: "https://videos.pexels.com/video-files/6286155/6286155-uhd_3840_2160_30fps.mp4",
  poster:
    "https://images.pexels.com/videos/6286155/pexels-photo-6286155.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600",
  label: "Endurance · Indoor Track",
};

/** Man training hard inside a luxury gym. */
export const GYM_MAN: Clip = {
  src: "https://videos.pexels.com/video-files/5319432/5319432-uhd_3840_2160_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/5319432/pexels-photo-5319432.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600",
  label: "Strength · Floor 01",
};

/** Deadlift. */
export const GYM_DEADLIFT: Clip = {
  src: "https://videos.pexels.com/video-files/9778003/9778003-uhd_3840_2160_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/9778003/pexels-photo-9778003.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600",
  label: "Deadlift",
};

/** Pull-ups. */
export const GYM_PULLUP: Clip = {
  src: "https://videos.pexels.com/video-files/5752494/5752494-uhd_3840_2160_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/5752494/pexels-photo-5752494.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600",
  label: "Pull-Ups",
};

/** Dumbbell / arms work. */
export const GYM_ARMS: Clip = {
  src: "https://videos.pexels.com/video-files/6390398/6390398-uhd_3840_2160_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/6390398/pexels-photo-6390398.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600",
  label: "Hypertrophy",
};

/** Boxing — heavy bag. */
export const FIGHT_BOXING: Clip = {
  src: "https://videos.pexels.com/video-files/5752364/5752364-uhd_3840_2160_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/5752364/pexels-photo-5752364.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600",
  label: "Fight Club",
};

/** Girl stretching — mobility studio. */
export const YOGA_STRETCH: Clip = {
  src: "https://videos.pexels.com/video-files/7326292/7326292-uhd_3840_2160_25fps.mp4",
  poster:
    "https://images.pexels.com/videos/7326292/pexels-photo-7326292.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600",
  label: "Mobility",
};

const px = (id: number, w = 900) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&fit=crop&w=${w}&h=${Math.round(
    w * 1.35,
  )}`;

export const TRAINERS = [
  {
    name: "Marcus Vale",
    role: "Head of Strength",
    tag: "Powerlifting · Olympic",
    img: px(30165254),
    years: "12 YRS",
  },
  {
    name: "Elena Rios",
    role: "Sprint & Conditioning",
    tag: "Treadmill · VO₂ Max",
    img: px(15549976),
    years: "09 YRS",
  },
  {
    name: "Dario Kane",
    role: "Fight Club Coach",
    tag: "Boxing · Muay Thai",
    img: px(29886673),
    years: "14 YRS",
  },
  {
    name: "Nadia Frost",
    role: "Mobility & Recovery",
    tag: "Yoga · Breathwork",
    img: px(17232317),
    years: "07 YRS",
  },
];
