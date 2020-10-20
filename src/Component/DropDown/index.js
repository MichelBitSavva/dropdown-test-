import React from 'react'
import './styles.css'
import downArrow from "../../Assets/Images/Rectangle 207.svg";
import upArrow from "../../Assets/Images/Rectangle 208.svg";
import Box from "../SelectedBox";
import closeItem from "../../Assets/Images/Rounded V2.svg";

class SelectBox extends React.Component {
    state = {
        ...this.props,
        items: this.props.items || [],
        selectedItem: [],
        showItems: false,
    }

    wrapper = React.createRef();
    array = [];


    componentWillUnmount() {
        this.removeOutsideClickListener();
    }

    addOutsideClickListener() {
        document.addEventListener('click', this.handleDocumentClick);
    }

    removeOutsideClickListener() {
        document.removeEventListener('click', this.handleDocumentClick);
    }

    onShow() {
        this.addOutsideClickListener();
    }

    onHide() {
        this.removeOutsideClickListener();
    }

    onClickOutside() {
        this.setState({showItems: false});
    }

    handleDocumentClick = e => {
        if (this.wrapper.current && !this.wrapper.current.contains(e.target)) {
            this.onClickOutside();
        }
    };

    dropDown = () => {
        this.setState(prevState => ({
                showItems: !prevState.showItems
            }),
            () => {
                this.state.showItems ? this.onShow() : this.onHide();
            },
        )
    }

    wrapperFunction = (item,event) => {
        this.selectItem(item,event);
        this.handleCheckElement(event);
    }

    selectItem = (item,event) => {
        let isCheck = event.target.checked
        if(isCheck){
            this.array.push(item)
            this.setState({
                selectedItem: this.array,
                showItems: false,
            })
        }else{
            let index = this.array.indexOf(item);
            this.array.splice(index,1)
        }

    }

    handleCheckElement = (event) => {
        let items = this.state.items
        items.forEach(item => {
            if (item.id === event.target.id)
                item.isChecked = true
        })
        this.setState({items: items})
    }

    setBlack(e) {
        e.currentTarget.src = require("../../Assets/Images/Rounded black.svg");
    }
    setGrey(e) {
        e.currentTarget.src = require("../../Assets/Images/Rounded V2.svg");
    }



    deleteAll = (e) => {
        e.stopPropagation();
        this.array = []
        let items = this.state.items
        items.map(item => item.isChecked = false)
        this.setState({
            selectedItem: this.array,
            items: items
        })

    }


    render() {
        return <div className="select-container">
            <div className="select-box--box">
                <div className="select-box--container"
                     onClick={this.dropDown}>

                    <input
                        style={{display: this.state.selectedItem.length === 0 ? 'block':'none'}}
                        placeholder="Все подклассы"
                        className="select-box--input"
                        type="text"/>

                    {this.state.selectedItem.length !== 0 &&
                    <Box items={this.state.selectedItem}/>}

                    <img
                        onClick={(e) => this.deleteAll(e)}
                        className="selected-box--close"
                        alt="delete"
                        src={closeItem}
                        onMouseOver={(e) => this.setBlack(e)}
                        onMouseLeave={(e) => this.setGrey(e)}
                        style={{visibility: this.state.selectedItem.length === 0 ? 'hidden' : 'visible'}}
                    />

                    <div ref={this.wrapper}
                         className="select-box--arrow"
                    >

                        <img
                            alt="Profile"
                            src={this.state.showItems === true ? upArrow : downArrow}
                        />
                    </div>
                </div>
                <div
                    className="select-box--items"
                    style={{display: this.state.showItems ? 'block' : 'none'}}
                >
                    {
                        this.state.items.map(item => <div
                            key={item.id}
                            className="select-box-wrapper-drop-items"
                        >

                            <div className="select-box-wrap">
                                <label>
                                    <input
                                        type="checkbox"
                                        defaultChecked={item.isChecked}
                                        onClick={(event) => this.wrapperFunction(item,event)}
                                        className="select-box-checkbox"
                                    />
                                </label>
                            </div>

                            <div className="select-box--selected-item-short">
                                {item.short}
                            </div>

                            <div className="select-box--selected-item">
                                {item.value}
                            </div>

                        </div>)
                    }
                </div>
            </div>
        </div>
    }
}

export default SelectBox