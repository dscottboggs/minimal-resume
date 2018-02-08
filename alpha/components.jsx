import React from 'react';

export class Header extends React.Component{
    get name() {
        <h1 className='header' id='name'>"D. Scott Boggs, Jr."</h1>
    }
    get email() {
        <h3 className='header' id='email'>"scott@tams.tech"</h3>
    }
    get phone() {
        <h3 className='header' id='phone'>"(724) 393 - 5536"</h3>
    }
    render () {
        <head id="header">
            {this.name}<br />
            {this.email}<br />
            {this.phone}
            <title name='site-title'>{this.name} - Resume</title>
        </head>
    }
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
                children={this.props.children}/>
        }
    }
};
class Pane extends React.Component {
    render() {
        return (
            <div id={this.props.parentId}>
                <div
                    id={this.props.titleId}
                    className={this.props.titleClass}
                    onClick{this.props.onClick}
                >{this.props.title}</div>
            <PaneText
                id={this.props.childID}
                className={this.props.childClass}
                children={this.props.children} \>
            </div>
        )
    }
}
class PaneText extends React.Component {
    render(){
        if (this.props.open){
            return null;
        }
        return (
            <div id={this.props.id} className={this.props.className}>
                {this.props.children}
            </div>
        )
    }
}

export class Footer extends React.Component {
  render() {
    <div className="footer">
      <div id="footer-title">Quick Links</div><br />
      { this.props.links.map(
        function(link) {
          return <a
            href={link.link}
            target="_blank"
            className="footlink"
            id={`footer_link_${link.text.strip(' ')}`}>{link.text}</a>
        }
      )}
    </div>
  }
}
