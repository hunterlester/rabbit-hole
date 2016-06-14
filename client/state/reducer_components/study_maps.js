import {Map, fromJS, toJS} from 'immutable';
import { STUDY_MAPS_POST, STUDY_MAPS_SUCCESS, STUDY_MAPS_FAILURE, LINK_POST, BREADCRUMB_POST, BREADCRUMB_LINK_POST, MESSAGE_POST, LINK_MESSAGE_POST, STUDYMAP_GET, SEEN_UPDATE, BLINKSEEN_UPDATE } from '../api/actions';
import { SET_STUDY_MAPS } from '../study_map_actions';
import { initialStudyMaps } from '../middleware/api';

export default function study_maps(state = initialStudyMaps, action) {
  switch (action.type) {
    case SET_STUDY_MAPS:
      return state.merge({
        isFetching: false,
        study_maps: action.study_maps
      });
    case STUDY_MAPS_POST:
      return state.setIn(['study_maps', action.response._id], fromJS(action.response));

    case STUDY_MAPS_SUCCESS:
      return state.merge({
        isFetching: false,
        study_maps: action.response,
        authenticated: action.authenticated || false
      });
    case STUDY_MAPS_FAILURE:
      return state.merge({
        isFetching: false
      });
    case LINK_POST:
        let linkObj = action.response;
        return state.setIn(['study_maps', linkObj.study_map, 'links', linkObj._id], fromJS(linkObj));

    case SEEN_UPDATE:
      let breadObj = action.response;

      let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
      parsedStudyMaps[breadObj.study_map].breadcrumbs[breadObj._id] = breadObj;
      let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
      localStorage.setItem('study_maps', JSONstudyMaps);

      return state.updateIn(['study_maps', breadObj.study_map, 'breadcrumbs', breadObj._id, 'seen'], val => true);

    case BLINKSEEN_UPDATE:
      let breadLink = action.response;

      return state.updateIn(['study_maps', breadLink.study_map, 'links', breadLink.link , 'breadcrumbs', breadLink._id, 'seen'], val => true);

    case BREADCRUMB_POST:
      let breadcrumb = action.response;
      return state.setIn(['study_maps', breadcrumb.study_map, 'breadcrumbs', breadcrumb._id], fromJS(breadcrumb));

    case BREADCRUMB_LINK_POST:
      let breadcrumbObj = action.response;
      return state.setIn(['study_maps', breadcrumbObj.study_map, 'links', breadcrumbObj.link, 'breadcrumbs', breadcrumbObj._id], fromJS(breadcrumbObj));

    case MESSAGE_POST:
      let message = action.response;
      return state.setIn(['study_maps', message.study_map, 'breadcrumbs', message.breadcrumb, 'messages', message._id], fromJS(message));

    case LINK_MESSAGE_POST:
      let messageObj = action.response;
      return state.setIn(
        ['study_maps', messageObj.study_map, 'links', messageObj.link,
        'breadcrumbs', messageObj.breadcrumb, 'messages', messageObj._id], fromJS(messageObj));

  }
  return state;
}
