import React, { useEffect, useRef, useState } from 'react';
import { isBrowser } from 'react-device-detect';
import styled from 'styled-components';
import { HiMenu } from 'react-icons/hi';

import {
  navData,
  NavDataIdType,
  NavDataInterface,
} from '../data/navigationData';

import { media, setBorder, setFlex, setTransition } from '../styles/styles';
import { useFunctionalContext } from '../contexts/functional.context';

interface LocationModel {
  center?: number;
  bottom?: number;
}

const Navigation: React.FC = () => {
  const { prefix, handleNavActions } = useFunctionalContext();

  const [isMobileNavActive, setIsMobileNavActive] = useState<boolean>(false); // only for navbar on phone devices
  const [nameTooltip, setNameTooltip] = useState<string>('');
  const [location, setLocation] = useState<LocationModel>({});
  const [isShowed, setIsShowed] = useState<boolean>(false);
  const [newNavData, setNewNavData] = useState<NavDataInterface[]>(navData);
  const container = useRef<null | HTMLElement>(null);

  const hiddeMobileNav = (id: NavDataIdType) => {
    setIsMobileNavActive(false);
    handleNavActions!(id);
  };

  useEffect(() => {
    if (prefix.includes('linear')) {
      setNewNavData(
        navData.filter(
          (item) =>
            item.id !== NavDataIdType.LINEAR &&
            item.id !== NavDataIdType.POSITION
        )
      );
    } else if (prefix.includes('radial')) {
      setNewNavData(
        navData.filter(
          (item) =>
            item.id !== NavDataIdType.RADIAL && item.id !== NavDataIdType.ANGLE
        )
      );
    }
  }, [prefix]);

  const displayTooltip = (e: { target: any }, tooltipText: string) => {
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

  return isBrowser ? (
    <Wrapper>
      {newNavData.map((item) => {
        const Icon = item.icon;
        return (
          <li
            key={item.id}
            onMouseOver={(e) => displayTooltip(e, item.name)}
            onMouseOut={closeTooltip}
            onClick={() => handleNavActions!(item.id)}>
            <Icon />
          </li>
        );
      })}
      <aside
        ref={container}
        className={isShowed ? 'tooltip showed' : 'tooltip'}>
        {nameTooltip}
      </aside>
    </Wrapper>
  ) : (
    <MobileWrapper>
      <HiMenu onClick={() => setIsMobileNavActive(!isMobileNavActive)} />
      <ul className={isMobileNavActive ? 'nav-links show-links' : 'nav-links'}>
        {newNavData.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.id}
              onMouseOver={(e) => displayTooltip(e, item.name)}
              onMouseOut={closeTooltip}
              onClick={() => hiddeMobileNav(item.id)}>
              <Icon />
              {item.name}
            </li>
          );
        })}
      </ul>
    </MobileWrapper>
  );
};

const MobileWrapper = styled.section`
  position: relative;
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  display: grid;
  grid-template-columns: min-content 1fr;

  & > svg {
    grid-column: 1 / span 1;
    height: 4rem;
    width: 4rem;
    fill: ${(props) => props.theme.color3};
  }

  .nav-links {
    position: absolute;
    top: 0;
    grid-column: 2 / span 1;
    justify-self: center;
    width: 85%;
    max-width: 50rem;
    ${setFlex({ x: 'space-evenly' })};
    flex-direction: column;
    height: 0;
    overflow: hidden;
    ${setTransition()};

    li {
      text-transform: uppercase;
      text-align: center;
      font-size: 1.75rem;
      color: ${(props) => props.theme.color1};
      width: 90%;
      padding: 1rem;
      ${setBorder({ style: 'none' })};
      display: grid;
      grid-template-columns: 0.25fr 1fr;
      place-items: center;
      box-shadow: 0.15rem 0.15rem 0.75rem ${(props) => props.theme.color3};
      background: ${(props) => props.theme.color2};

      svg {
        font-size: 2rem;
        fill: ${(props) => props.theme.color1};
      }
    }
  }

  .show-links {
    height: 40rem;
  }
`;

const Wrapper = styled.ul`
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  ${setFlex({ x: 'space-around' })};

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
      fill: ${(props) => props.theme.color3};
    }
  }

  .tooltip {
    display: none;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.1rem;
    color: ${(props) => props.theme.color2};
    position: absolute;
    ${setBorder({ style: 'none' })};
    padding: 1rem;
    background: ${(props) => props.theme.color3};
    top: 4rem;
    transform: translateX(-50%);
    opacity: 0.8;
    ${setTransition()};
  }

  .tooltip.showed {
    display: block;
  }
`;

export default Navigation;
