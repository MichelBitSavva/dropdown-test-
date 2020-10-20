import React from 'react';
import s from "./Index.module.css";
import SelectBox from "../Component/DropDown/index";
import List from "../Utils/Constants";



const StartPage = () => {
    return (
        <div className="App">
            <div className={s.line}>
                <div className={s.selectBoxWrapper}>
                    <SelectBox
                        name="team"
                        items={List}
                    />
                </div>

            </div>
        </div>
    );
};

export default StartPage;