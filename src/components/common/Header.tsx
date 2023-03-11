import Logo from 'assets/MIRA.png';
import {
  AtlassianNavigation,
  PrimaryButton,
  PrimaryDropdownButton,
  CustomProductHome,
  SignIn,
} from '@atlaskit/atlassian-navigation';
import './Header.scss';

const DefaultSignIn = () => <SignIn href="#" tooltip="Sign in" />;

const CustomHome = () => (
  <CustomProductHome
    href="/"
    iconAlt="Mira Icon"
    iconUrl={Logo}
    logoAlt="Mira Logo"
    logoUrl={Logo}
  />
);

const Header = () => (
  // <AtlassianNavigation
  //   renderSignIn={DefaultSignIn}
  //   label="site"
  //   primaryItems={[
  //     <PrimaryButton key="1">Your work</PrimaryButton>,
  //     <PrimaryDropdownButton key="2">Issues</PrimaryDropdownButton>,
  //     <PrimaryDropdownButton key="3">Projects</PrimaryDropdownButton>,
  //     <PrimaryButton key="4">Repositories</PrimaryButton>,
  //   ]}
  //   renderProductHome={CustomHome}
  // />

  <AtlassianNavigation
    label="site"
    renderProductHome={() => null}
    renderSignIn={DefaultSignIn}
    primaryItems={[]}
  />
);

export default Header;
