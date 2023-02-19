# ShiftLeft

```mdx-code-block
import StoSettingScanType from './shared/_sto-ref-ui-scan-type.md';
import StoSettingScanTypeRepo from './shared/_sto-ref-ui-scan-type-00-repo.md';
import StoSettingScanMode from './shared/_sto-ref-ui-scan-mode.md';
import StoSettingScanModeOrch from './shared/_sto-ref-ui-scan-mode-00-orchestrated.md';
import StoSettingScanModeData from './shared/_sto-ref-ui-scan-mode-01-dataload.md';
import StoSettingScanModeIngest from './shared/_sto-ref-ui-scan-mode-02-ingestonly.md';

```

Specify the following options to set up a ShiftLeft scan.

* `product_name` = `shiftleft`

* [`scan_type`](#scan-type)
	+ accepted value(s): `repository`
* [`policy_type`](#scan-mode)
	+ accepted value(s): `orchestratedScan`, `dataLoad`, `ingestionOnly`
* When `policy_type` is set to `orchestratedScan` or `dataLoad`
	+ `product_access_id`
	+ `product_access_token`
	+ `product_app_name`
	+ `product_target_language`
* `product_config_name`
	+ Accepted values(s):
		- `default`

<a name="scan-type"></a>

<StoSettingScanType />
<StoSettingScanTypeRepo />


<a name="scan-mode"></a>
<StoSettingScanMode />
<StoSettingScanModeOrch />
<StoSettingScanModeData />
<StoSettingScanModeIngest />


