import React from 'react';

type Props={children:React.ReactNode,onBack?:()=>void};
type State={error:boolean};
export default class GameBoundary extends React.Component<Props,State>{
  state:State={error:false};
  static getDerivedStateFromError(){return {error:true}}
  componentDidCatch(error:unknown){console.error('MGLabs game error',error)}
  render(){
    if(this.state.error)return <section className="game-error"><h2>Game encountered an error</h2><p>The rest of MGLabs is still running.</p><div className="buttons"><button onClick={()=>this.setState({error:false})}>Restart Game</button>{this.props.onBack&&<button className="secondary" onClick={this.props.onBack}>Back to Games</button>}</div></section>;
    return this.props.children;
  }
}
