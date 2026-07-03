export const getProjectDeckImage = (project) => project.mobileImage ?? project.image;

const loaded = new Set();
const inflight = new Map();

export const preloadImage = (src) => {
  if (!src || loaded.has(src)) {
    return Promise.resolve();
  }

  if (inflight.has(src)) {
    return inflight.get(src);
  }

  const promise = new Promise((resolve) => {
    const image = new Image();
    const finish = () => {
      loaded.add(src);
      inflight.delete(src);
      resolve();
    };

    image.onload = finish;
    image.onerror = finish;
    image.src = src;
  });

  inflight.set(src, promise);
  return promise;
};

export const preloadCodeDropsImages = (projects = []) =>
  Promise.all(projects.map((project) => preloadImage(getProjectDeckImage(project))));

export const preloadCodeDropsNeighbors = (activeIndex, projects = []) => {
  const total = projects.length;
  const indices = new Set([
    activeIndex,
    (activeIndex + 1) % total,
    (activeIndex - 1 + total) % total,
  ]);

  return Promise.all([...indices].map((index) => preloadImage(getProjectDeckImage(projects[index]))));
};

export const isImagePreloaded = (src) => loaded.has(src);