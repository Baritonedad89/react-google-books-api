import React from 'react'

const CardWrapper = (props) => {

    return (

        <div class="row">
            <div class="col l12 m6">
                <div class="card">
                    <div class="card-content black-text">
                        <span class="card-title">Results</span>
                        <div className="row">{props.children}</div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default CardWrapper