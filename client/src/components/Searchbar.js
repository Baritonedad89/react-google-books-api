import React from 'react'

const Searchbar = (props) => {
    return (
        <div className='container'>
            <div className="row">
                <div className="input-field col l12 center-align">
                    <textarea id="textarea1" className="materialize-textarea center-align"
                        onChange={props.handleInputChange}
                        value={props.value}
                        name="search"
                        type="text"
                        placeholder="Search For a Book"
                        id="search"
                    />
                    <a className="waves-effect waves-light btn" onClick={props.handleFormSubmit}>search</a>

                </div>
            </div>
        </div>

















    )
}

export default Searchbar