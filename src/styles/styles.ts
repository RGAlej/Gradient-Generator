export const setColor = {
  orchidColor: '#7980FF',
  roseColor: '#FF0066'
};

export const setFlex = ({ x = 'center', y = 'center' } = {}) => {
  return `display:flex; align-items: ${y}; justify-content: ${x}`;
};

export const setTransition = ({ property = 'all', time = '0.5s', timing = 'ease-in-out' } = {}) => {
  return `transition:${property} ${time} ${timing}`;
};

export const setBorder = ({
                            width = '.2rem',
                            style = 'solid',
                            color = setColor.orchidColor,
                            radius = '0.25rem'
                          } = {}) => {
  return `border: ${width} ${style} ${color}; border-radius: ${radius}`;
};

export const sizes = {
  big_desktop: 112.5,
  tablet_land: 75,
  tablet_port: 56.25,
  phone: 37.5
};

export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
    (acc, key) => {
      if (key === 'big_desktop') {
        acc[key] = (style: String) =>
            `@media (min-width: ${sizes[key]}em) { ${style} }`;
        return acc;
      } else {
        acc[key] = (style: String) =>
            `@media (max-width: ${sizes[key]}em) { ${style} }`;
        return acc;
      }
    },
    {} as { [index: string]: Function }
);