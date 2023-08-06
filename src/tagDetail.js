import React, {useState} from "react";
import tagData from "./tagData";
import { useParams } from "react-router-dom";

function TagDetail({TagId}) {
    // const {id} = useParams();

    // const TagTitle = tagData.map(tag => tag.id);
    // console.log(TagTitle)
    
    return(
        <div className="tagmain">
            <h1 className="topId">
                재영아 사랑해
            </h1>
        </div>
    )
}
export default TagDetail;