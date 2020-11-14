import axios from "axios";

import { GET_AREAS } from "./types";

export const getAreas = (rubro_id) => async (dispatch) => {
  const resp = await axios.get("/areas/" + rubro_id);

  dispatch({ type: GET_AREAS, payload: resp.data.areas });

  
};
