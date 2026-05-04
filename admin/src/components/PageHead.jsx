import React from 'react';

export default function PageHead({ title, sub, actions }) {
    return (
        <div className="page-head">
            <div>
                {sub && <div className="sub">{sub}</div>}
                <h1>{title}</h1>
            </div>
            {actions && <div>{actions}</div>}
        </div>
    );
}
