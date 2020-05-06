import React from 'react';
import '../../../css/grid12.css';



class Tab extends React.Component{
    render() {
        var {key ,title ,callback} = this.props;
        return(
        <button className="tablinks" onClick={e => callback(e, {title})}>{title}</button>
        )
    }
}

class Tabs extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            selected:this.props.selected || 0,
        }

        this.handleTab = this.handleTab.bind(this);
    }


    handleChange = (index) => {
        this.setState({selected:index})
    }

    handleTab=(evt,cityName)=>{
        // var i, tabcontent, tablinks;
        // tabcontent = document.getElementsByClassName("tabcontent");
        // for (i = 0; i < tabcontent.length; i++) {
        //     tabcontent[i].style.display = "none";
        // }
        // tablinks = document.getElementsByClassName("tablinks");
        // for (i = 0; i < tablinks.length; i++) {
        //   tablinks[i].className = tablinks[i].className.replace(" active", "");
        // }
        // document.getElementById(cityName).style.display = "block";
        // evt.currentTarget.className += " active";
    }



    render() {
        var menu, items;
        if(this.props.menu){
            menu = this.props.menu
        }
        items = menu.map((item , index) =>
            <Tab key={index} title={item.title} callback={this.handleChange}/>
        );
        return(

            <div className="grid_12">
            <div className="tab grid_6">
              {items}
            </div> 
          </div>

        );
    }
}


export default Tabs;







//     render(){
//       return (<div>
//         <ul className="inline">
//           {this.props.children.map((elem,index)=>{
//             let style = index == this.state.selected ? 'selected': '';
//            return <li className={style} key={index} onClick={this.handleChange.bind(this,index)}>{elem.props.title}</li>
//           })}
//         </ul>
//         <div className="tab">{this.props.children[this.state.selected]}</div>
//         </div>
//       )
//     },
//       handleChange(index){
//         this.setState({selected:index})
//       }
//   })
  
//   const Panel = React.createClass({
//     render(){
//       return <div>{this.props.children}</div>
//     }
//   })
  
//   const App = React.createClass({
//     render(){
//       return (
//         <Tabs selected={1}>
//           <Panel title="first">This is the first panel</Panel>
//           <Panel title="second">This is the second panel</Panel>
//           <Panel title="third">This is the third panel</Panel>
//         </Tabs>
//       )
//     }
//   })
//   React.render(<App/>,document.querySelector('#app'))