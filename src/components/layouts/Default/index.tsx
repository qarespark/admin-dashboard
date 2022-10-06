import SidebarComponent from 'components/modules/sidebar';
import React, { } from 'react';

type Props = {
  children: React.ReactNode;
};

const Default = ({ children }: Props) => {

  return (
    <div className="layout-wrapper">
      <div className='layout-sidebar-wrap'>
        <SidebarComponent />
      </div>
      <div className='layout-content-wrap'>
        <React.Fragment>{children}</React.Fragment>
      </div>
    </div>
  )
};

export default Default;
