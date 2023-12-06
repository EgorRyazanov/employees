import { FC, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { typedMemo } from '../../utils/typedMemo';
import { RoutePaths } from '../../utils/routePaths';
import { TabsComponent } from '../Tabs';
import { TabComponent } from '../Tab';
import logoLink from '/src/assets/logo.svg';
import styles from './Header.module.scss';

const HeaderComponent: FC = () => {
  const [value, setValue] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setValue(location.pathname === RoutePaths.MainView ? 0 : 1);
  }, [location.pathname]);

  return (
    <div className={styles.headerContainer}>
      <img src={logoLink} alt="Logo" />
      <TabsComponent
        value={value}
        aria-label="Навигация"
        TabIndicatorProps={{
          style: { display: 'none' },
        }}>
        <TabComponent
          label="Стандартный вид"
          onClick={() => {
            navigate(RoutePaths.MainView);
          }}
        />
        <TabComponent
          label="Табличный вид"
          onClick={() => {
            navigate(RoutePaths.TableView);
          }}
        />
      </TabsComponent>
    </div>
  );
};

export const Header = typedMemo(HeaderComponent);
