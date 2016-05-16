import {Map, fromJS} from 'immutable';
import { STUDY_MAPS_POST, STUDY_MAPS_SUCCESS, STUDY_MAPS_FAILURE, LINK_POST, BREADCRUMB_POST, BREADCRUMB_LINK_POST, MESSAGE_POST, LINK_MESSAGE_POST, STUDYMAP_GET } from '../api/actions';
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
      return state.merge({
        study_maps: state.get('study_maps').push(fromJS(JSON.parse(action.response)))
      });
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
        return state.merge({
          study_maps: state.get('study_maps').map(study_map => {
            if(JSON.parse(action.response).study_map === study_map.get('_id')) {
              return study_map.set('links',
                study_map.get('links').push(fromJS(JSON.parse(action.response)))
              );
            } else {
              return study_map;
            }
          })
        });
    case BREADCRUMB_POST:
      return state.merge({
        study_maps: state.get('study_maps').map(study_map => {
          if(JSON.parse(action.response).study_map === study_map.get('_id')) {
            return study_map.set('breadcrumbs',
              study_map.get('breadcrumbs').push(fromJS(JSON.parse(action.response)))
            );
          } else {
            return study_map;
          }
        })
      });
      case BREADCRUMB_LINK_POST:
        return state.merge({
          study_maps: state.get('study_maps').map(study_map => {
            if(JSON.parse(action.response).study_map === study_map.get('_id')) {
              return study_map.set('links',
                study_map.get('links').map(link => {
                  if(JSON.parse(action.response).link === link.get('_id')) {
                    return link.set('breadcrumbs',
                        link.get('breadcrumbs').push(fromJS(JSON.parse(action.response)))
                    );
                  } else {
                    return link;
                  }
                })
              )
            } else {
              return study_map;
            }
          })
        });
      case MESSAGE_POST:
        return state.merge({
          study_maps: state.get('study_maps').map(study_map => {
            if(JSON.parse(action.response).study_map === study_map.get('_id')) {
              return study_map.set('breadcrumbs',
                study_map.get('breadcrumbs').map(breadcrumb => {
                  if(JSON.parse(action.response).breadcrumb === breadcrumb.get('_id')) {
                    return breadcrumb.set('messages',
                        breadcrumb.get('messages').push(fromJS(JSON.parse(action.response)))
                    );
                  } else {
                    return breadcrumb;
                  }
                })
              )
            } else {
              return study_map;
            }
          })
        });
      case LINK_MESSAGE_POST:
        return state.merge({
          study_maps: state.get('study_maps').map(study_map => {
            if(JSON.parse(action.response).study_map === study_map.get('_id')) {
              return study_map.set('links',
                study_map.get('links').map(link => {
                  if(JSON.parse(action.response).link === link.get('_id')) {
                    return link.set('breadcrumbs',
                        link.get('breadcrumbs').map(breadcrumb => {
                          if(JSON.parse(action.response).breadcrumb === breadcrumb.get('_id')) {
                            return breadcrumb.set('messages',
                              breadcrumb.get('messages').push(fromJS(JSON.parse(action.response)))
                            );
                          } else {
                            return breadcrumb;
                          }
                        })
                    );
                  } else {
                    return link;
                  }
                })
              )
            } else {
              return study_map;
            }
          })
        });
      case STUDYMAP_GET:
        return state.merge({
          single_study_map: fromJS(JSON.parse(action.response))
        });
  }
  return state;
}
