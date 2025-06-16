import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can configure the steps to directly use the severity provided by scanners. By default, STO assigns severity based on numeric scoring (such as CVSS). Enabling this setting instructs STO to bypass its internal severity mapping and directly use severity levels (Critical, High, Medium, Low, etc.) as reported by the scanner itself.

To enable this behavior, In the **Settings** section of your step, add the setting `ingest_tool_severity` and set it to `true`.

<Tabs>
    <TabItem value="Visual" label="Visual" default>
    <DocImage path={require('../static/sto-7041-add-setting-in-visual-editor.png')} width="50%" height="50%" title="Click to view full size image" />
      </TabItem>
    <TabItem value="YAML" label="YAML">
          ``` yaml
          - step:
              type: <scanner_name>
              spec:
                settings:
                  ingest_tool_severity: "true"
          ```
      </TabItem>
</Tabs>