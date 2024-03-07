'use client'
import { useState } from "react"

export default function Portlet ({
    title,
    handler,
    children,
    color,
  }) {

    const [display, setDisplay] = useState(color === "bg-light" ? false : true)

return (
    <div className="row">
    <div className="col-md-12 accordion accordion-flush " id={`accordion-${handler}`}>
        <div className="accordion-item ">
            <h2 class="accordion-header" id={`heading-${handler}`}>
                <button class={`accordion-button ${color}`} type="button" onClick={() => setDisplay(!display)}>
                    {title}
                </button>
            </h2>
            <div id={`collapse-${handler}`} class={`accordion-collapse collapse ${display && "show" }`} aria-labelledby={`heading-${handler}`}>
                <div class="accordion-body">
                    {children}
                </div>
            </div>            
        </div>             
    </div>
    
</div>
)
}