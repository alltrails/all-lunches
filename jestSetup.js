/* eslint-env jest */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import enableHooks from 'jest-react-hooks-shallow';

configure({ adapter: new Adapter() });

jest.mock('./src/lib/analytics');

enableHooks(jest, { dontMockByDefault: true });
