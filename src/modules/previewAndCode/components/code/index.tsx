import React, { Component, createRef } from 'react';
import { Tabs } from 'antd';
import hljs from 'highlight.js';
import { generatePageCode} from '../../utils';
import styles from './style.less';
import 'highlight.js/styles/androidstudio.css';

const { TabPane } = Tabs;

interface CodeStateType {
  code:string,
  activeKey:string,
  style:string
}

export default class Code extends Component<any,CodeStateType> {
  codeRef:any;
  styleRef:any;
  constructor(props:any) {
    super(props);
    this.state = {
      code: '',
      activeKey: '1',
      style: '',
    };
    this.codeRef = createRef();
    this.styleRef = createRef();
  }


  componentDidMount() {
    const { componentConfigs} = this.props;
   const {pageCodes, styleSheetCodes}=generatePageCode(componentConfigs)
    this.setState({
      code: pageCodes,
      style: styleSheetCodes,
    }, this.highlightCode);
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode = () => {
    hljs.highlightBlock(this.codeRef.current);
    hljs.highlightBlock(this.styleRef.current);
  };

  onChange = (activeKey:string) => this.setState({ activeKey });

  render() {
    const { code, activeKey, style } = this.state;
    return (
        <Tabs
          onChange={this.onChange}
          activeKey={activeKey}
          className={styles['card-container']}
        >
          <TabPane style={{height:'100%'}} forceRender key="1" tab="代码">
            <pre style={{ height: '100%', margin: 0 }}>
              <code style={{ height: '100%' }} ref={this.codeRef} className="language-js">
                {`${code}\n\n\n\n\n`}
              </code>
            </pre>
          </TabPane>
          <TabPane style={{height:'100%'}} forceRender key="2" tab="样式">
            <pre style={{ height: '100%', margin: 0 }}>
              <code style={{ height: '100%' }} ref={this.styleRef} className="language-js">
                {`\n${style}\n\n\n\n\n`}
              </code>
            </pre>
          </TabPane>
        </Tabs>
    );
  }
}
