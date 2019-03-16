import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
    margin-left: 30px

`

const Card = (props) => {
    return (
        <div className="col l12">
            <div class="card horizontal">
                <div class="card-image col l2">
                    <img src={props.url} alt={props.name} />
                </div>

                <div class="card-stacked col l10">
                    <div class="card-content">
                        <div class="col l9">
                            <span class="card-title activator grey-text text-darken-4">{props.name}</span>
                            <h6>{props.author}</h6>
                            {/* <p>{props.desc}</p> */}
                            {props.desc.length > 2500 ? <p>{props.desc.substring(0,600) + '...'}</p>   : <p>{props.desc}</p>}

                            
                        </div>
                        <div class="col l3">
                        <a href={props.infoLink} target="_blank" class="waves-effect waves-light btn">{props.leftButton}</a>
                        <a onClick={props.handleBookSave || props.handleBookDelete} data-id={props.id} class="waves-effect waves-light btn">{props.rightButton}</a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Card 