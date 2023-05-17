import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const Testing = () => {
  const { state } = useParams();
  const nav = useNavigate();

  console.log("state", state);

  return <>{state == "overview" ? <div>overview

<button onClick={()=>nav(`/test/add-activity`)} >add activity</button>
<button onClick={()=>nav(`/test/add-activity`)} >edit  activity</button>

  </div> : state=="add-activity"? <div>
    add activity is here 
    now 

  </div>:""}</>;
};

export default Testing;
