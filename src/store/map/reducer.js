/* eslint-disable default-param-last */
import { mergeReports } from 'lib/mapUtils';
import { ADD_REPORT, QUERY_AREA } from './actions';

export const INITIAL_STATE = {
  isLoading: false,
  reports: null,
  numOfReports: 0,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;

  switch (type) {
    case ADD_REPORT.PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case ADD_REPORT.ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case ADD_REPORT.SUCCESS:
      return {
        ...state,
        isLoading: false,
        reports: state.reports ? mergeReports(state.reports, payload) : payload,
        numOfReports: state.numOfReports ? state.numOfReports + 1 : 1,
      };
    case QUERY_AREA.SUCCESS: {
      const { numOfReports, reports } = payload;

      return {
        ...state,
        reports,
        numOfReports,
      };
    }

    default:
      return state;
  }
};
