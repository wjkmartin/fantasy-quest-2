import React from "react";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import Inventory from "./Inventory/Inventory";
import Equipped from "./Equipped/Equipped"
import Powers from "./Powers/Powers"
import Quests from "./Quests/Quests"
import Codex from "./Codex/Codex"
import Skills from "./Skills/Skills"
import Friends from "./Friends/Friends"
import System from "./System/System"

export default function Notebook(props) {
    return (
      <div className={props.className}>
        <Tabs defaultActiveKey="inventory" transition={false} id="Notebook-tabs">
          <Tab eventKey="inventory" title="Inventory">
            <Inventory />
          </Tab>
          <Tab eventKey="equipped" title="Equipped">
            <Equipped />
          </Tab>
          <Tab eventKey="powers" title="Powers">
            <Powers />
          </Tab>
          <Tab eventKey="codex" title="Codex">
            <Codex />
          </Tab>
          <Tab eventKey="skills" title="Skills">
            <Skills />
          </Tab>
          <Tab eventKey="quests" title="Quests">
            <Quests />
          </Tab>
          <Tab eventKey="friends" title="Friends">
            <Friends />
          </Tab>
          <Tab eventKey="system" title="System">
            <System />
          </Tab>
        </Tabs>
      </div>
    );
}