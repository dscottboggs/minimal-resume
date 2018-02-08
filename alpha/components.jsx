import React from 'react';

export const Header = () => {
    return (
        <div id="header">
            {this.props.name}<br />
            {this.props.email}<br />
            {this.props.phone}
        </div>
    )
}

export class PaneParent extends React.Component {
    constructor (props) {
        super(props);
        this.state = {open: false}
        this.flip = this.flip.bind(this)
    }
    flip () {
        this.setState(
            {open: this.state.open? false: true}
        )
    }
    render() {
        if (this.props.hasChildPanes){
            // The hasChildPanes option is used to note that the pane has subpanes
            this.props.children.map(
                // in that case, PaneParents are recursively created for each
                // subPanel
                (childPane) => {
                    return (
                        <PaneParent
                            identifier={childPane.identifier}
                            title={childPane.title}
                            children={childPane.children}
                        />
                    )
                }
            );
        }else {
            return (
                <Pane
                    parentId={`panel_wrapper_${this.props.identifier.strip(" ")}`}
                    titleId={`panel_header_${this.props.identifier.strip(" ")}`}
                    titleClass="panel-header"
                    childID={`panel_${this.props.identifier.strip(' ')}`}
                    childClass="panel"
                    onclick={this.flip}
                    children={this.props.children}
                />
            )
        }
    }
};
const Pane = () => {
    return (
        <div id={this.props.parentId}>
            <div
                    id={this.props.titleId}
                    className={this.props.titleClass}
                    onClick={this.props.onClick}
                >{this.props.title}
            </div>
            <PaneText
                id={this.props.childID}
                className={this.props.childClass}
                children={this.props.children}
            />
        </div>
    )
}

const PaneText = () => {
    if (this.props.open){
        return (
            <div id={this.props.id} className={this.props.className}>
                {this.props.children}
            </div>
        );
    }
    return null
}

export const Footer = () => {
    <div className="footer">
        <div id="footer-title">Quick Links</div><br />
        { this.props.links.map(
            function(link) {
                return (
                    <a
                            href={link.link}
                            target="_blank"
                            className="footlink"
                            id={`footer_link_${link.text.strip(' ')}`}
                        >{link.text}
                    </a>
                )
            }
        )}
    </div>
}
