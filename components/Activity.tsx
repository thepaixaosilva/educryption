import { ActivityProvider, useActivity } from '../contexts/activity';
import Reward from './activity/Reward';
import Content from './activity/Content';
import Header from './activity/Header';
import ProgressBar from './activity/ProgressBar';
import Root from './activity/Root';
import Stage from './activity/Stage';

const Activity = {
  Header,
  Content,
  Root,
  Stage,
  ProgressBar,
  Reward,
  Provider: ActivityProvider,
  useActivity,
};

export default Activity;
