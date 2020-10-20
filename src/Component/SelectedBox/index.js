import React from 'react'
import './styles.css'



class Box extends React.Component {
    state = {
        ...this.props,
        items: this.props.items
    }



    wrapperr = React.createRef();

    delete = (e,item) => {
        e.stopPropagation();
        let index = this.props.items.indexOf(item);
        this.props.items.splice(index,1)
        this.setState({
            items: this.props.items
        })

    }

    setBlack(e) {
        e.currentTarget.src = require("../../Assets/Images/Rounded black.svg");
    }
    setGrey(e) {
        e.currentTarget.src = require("../../Assets/Images/Rounded V2.svg");
    }

    render() {
        return  this.state.items.map(item =>
                <div ref={this.wrapperr}
                 key={item.id}
                 className='selected-container' >

            <div className="selected-box">
                {item.short}

                <img
                    onMouseOver={(e) => this.setBlack(e)}
                    onMouseLeave={(e) => this.setGrey(e)}
                    onClick={(e) =>this.delete(e,item)}
                    className="selected-box--arrow"
                    alt="delete"
                    src={require("../../Assets/Images/Rounded V2.svg")}
                />
            </div>
        </div>
        )
    }
}

export default Box