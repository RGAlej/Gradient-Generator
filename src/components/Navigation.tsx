import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { navData, NavDataIdType, NavDataInterface } from '../data/navigationData';

import { media, setBorder, setFlex, setTransition } from '../styles/styles';
import { useFunctionalContext } from '../contexts/functional.context';

interface LocationModel {
  center?: number;
  bottom?: number;
}

const Navigation: React.FC = () => {
  const { prefix, handleNavActions } = useFunctionalContext();
  const [nameTooltip, setNameTooltip] = useState<string>('');
  const [location, setLocation] = useState<LocationModel>({});
  const [isShowed, setIsShowed] = useState<boolean>(false);
  const [newNavData, setNewNavData] = useState<NavDataInterface[]>(navData);
  const container = useRef<null | HTMLElement>(null);

  useEffect(() => {
    if (prefix.includes('linear')) {
      setNewNavData(navData.filter(item => item.id !== NavDataIdType.LINEAR && item.id !== NavDataIdType.POSITION));
    } else if (prefix.includes('radial')) {
      setNewNavData(navData.filter(item => item.id !== NavDataIdType.RADIAL && item.id !== NavDataIdType.ANGLE));
    }
  }, [prefix]);

  const displayTooltip = (e: { target: any; }, tooltipText: string) => {
    const tempBtn = e.target.getBoundingClientRect();
    const center = (tempBtn.left + tempBtn.right) / 2;
    const bottom = tempBtn.bottom;
    openTooltip(tooltipText, { center, bottom });
  };

  const closeTooltip = () => {
    setIsShowed(false);
  };

  const openTooltip = (text: string, coordinates: LocationModel): void => {
    setIsShowed(true);
    setNameTooltip(text);
    setLocation(coordinates);
  };

  useEffect(() => {
    const itemRef = container.current;
    const { center, bottom } = location;
    if (itemRef) {
      itemRef.style.left = `${center! / 10}rem`;
      itemRef.style.top = `${bottom! / 10 + 1}rem`;
    }
  }, [location]);

  return (
      <Wrapper>
        {newNavData.map((item) => {
          const Icon = item.icon;
          return (
              <li key={item.id}
                  onMouseOver={(e) => displayTooltip(e, item.name)}
                  onMouseOut={closeTooltip}
                  onClick={() => handleNavActions!(item.id)}>
                <Icon />
              </li>
          );
        })}
        <aside ref={container}
               className={isShowed ? 'tooltip showed' : 'tooltip'}>{nameTooltip}</aside>
      </Wrapper>
  );
};

const Wrapper = styled.ul`
  grid-column: 2 / span 1;
  ${setFlex({ x: 'space-around' })};

  ${media.phone`
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
  `}
  & > li,
  & > a {
    cursor: pointer;
    width: 3rem;
    height: 3rem;
    margin: 0 2rem;
    ${setFlex()};

    ${media.tablet_port`
      margin: 0 .5rem;
    `}
    svg {
      font-size: 2rem;
      fill: ${props => props.theme.color3};
    }
  }

  .tooltip {
    display: none;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: .1rem;
    color: ${props => props.theme.color2};
    position: absolute;
    ${setBorder({ style: 'none' })};
    padding: 1rem;
    background: ${props => props.theme.color3};
    top: 4rem;
    transform: translateX(-50%);
    opacity: .8;
    ${setTransition()};
  }

  .tooltip.showed {
    display: block;
  }
}
`;

export default Navigation;