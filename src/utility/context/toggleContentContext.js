"use client"
import React, { Component, createContext } from "react";


const FoldedContentContext = createContext();

class FoldedContentProvider extends Component {
   state = {
      foldedContent: false,
      makeFullContent: () => {
         this.setState(prevState => ({
            foldedContent: true
         }));
      },
      makeNormalContent: () => {
         this.setState(prevState => ({
            foldedContent: false
         }));
      }
   };

   render() {
      return (
         <FoldedContentContext.Provider value={{ ...this.state }}>
            {this.props.children}
         </FoldedContentContext.Provider>
      );
   }
}
const FoldedContentConsumer = FoldedContentContext.Consumer;

export { FoldedContentProvider, FoldedContentConsumer };
