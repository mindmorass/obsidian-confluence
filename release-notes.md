:robot: I have created a release *beep* *boop*
---


<details><summary>@markdown-confluence/cli: 3.0.0</summary>

## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/@markdown-confluence/cli-v5.5.2...@markdown-confluence/cli-v3.0.0) (2026-01-21)


###   BREAKING CHANGES

* No longer bundling the lib package to help with tree shaking and code navigation

### Features

* Add docker CLI ([e8f930f](https://github.com/mindmorass/obsidian-confluence/commit/e8f930fbeb612152cf19f5b387fb322b4c82bc5e))
* Allow setting content root for FilesystemAdaptor ([d008f29](https://github.com/mindmorass/obsidian-confluence/commit/d008f294170561cec8ebfc7aa54352fb34c8cc44))
* Basic output from CLI ([46b47bd](https://github.com/mindmorass/obsidian-confluence/commit/46b47bd1c01de77b7c3de62d76c6ec74388c56c5))
* Enable SourceMaps in Docker ([5f13f52](https://github.com/mindmorass/obsidian-confluence/commit/5f13f526ec1dc3326d3517a6080139d047c6e9ca))
* Handle 404 when pageId included in YAML. Set to not publish and remove bad pageId ([33dde01](https://github.com/mindmorass/obsidian-confluence/commit/33dde014ccc24368f065eec0a92dba3755644fc8))
* Initial CLI version ([85b4aff](https://github.com/mindmorass/obsidian-confluence/commit/85b4aff13921accf6dd376e18929f3a19087757e))
* Move ImageUpload and MermaidRendering to plugins to allow for more plugins easily ([cfae670](https://github.com/mindmorass/obsidian-confluence/commit/cfae670d3bc94c4a88d02936c94ca9c1ab47ce9e))
* Snyk container scanning ([710a4a0](https://github.com/mindmorass/obsidian-confluence/commit/710a4a0c6d544835c74bbfa31939745d7e4a7b0d))


### Bug Fixes

* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* Check for duplicate page titles not file names. ([540b1f9](https://github.com/mindmorass/obsidian-confluence/commit/540b1f93cd20784f9c7c8f14895221667fe5f3f5))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* docker build ordering ([0110108](https://github.com/mindmorass/obsidian-confluence/commit/0110108ed9e68a864f5d425d7e3a0547b058b39d))
* Don't publish with dependancies for the CLI since they are bundled. ([52b3396](https://github.com/mindmorass/obsidian-confluence/commit/52b33969f58ea97ec25ed5b830929e231895ab43))
* Move SettingsLoaders to own files to help with TreeShaking ([f241a11](https://github.com/mindmorass/obsidian-confluence/commit/f241a11a3967d8a06e827ec100dca15533d38902))
* Pin puppeteer Docker container ([d9d5f11](https://github.com/mindmorass/obsidian-confluence/commit/d9d5f11516582ec80a51cf0f137ba30d0a15ef8e))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Set puppeteer cache dir ([0643ad3](https://github.com/mindmorass/obsidian-confluence/commit/0643ad37690e9260ae9bdd649f1df1c5abe6ff65))
* Show better CLI error messages ([2120168](https://github.com/mindmorass/obsidian-confluence/commit/21201681a767c03f87a188b8ddfd8436435f0921))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))
* yargs is a dep of lib not cli ([aca0a8b](https://github.com/mindmorass/obsidian-confluence/commit/aca0a8bd259703850b6694c9f1bec01ac7d8205f))


### Dependencies

* **deps:** bump puppeteer/puppeteer in /packages/cli ([ca328b5](https://github.com/mindmorass/obsidian-confluence/commit/ca328b5ee2d7db1f9cd1caddf10505996a414a6e))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([3621e77](https://github.com/mindmorass/obsidian-confluence/commit/3621e775033111cb74430e8b39a1b1297d2a4f51))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([e603bdd](https://github.com/mindmorass/obsidian-confluence/commit/e603bdd3d3a8de6aaa84823bd7c7cf820073b9f9))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([912df0e](https://github.com/mindmorass/obsidian-confluence/commit/912df0e52e29d27292d463f484b873afcb9a967f))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([2cd503f](https://github.com/mindmorass/obsidian-confluence/commit/2cd503f4f41ba04038111c8c305d6d8a7a9cab8c))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([9af5ed9](https://github.com/mindmorass/obsidian-confluence/commit/9af5ed9d86eb90a19f9445ab22a808b22f9a4733))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([bd8fa02](https://github.com/mindmorass/obsidian-confluence/commit/bd8fa026d71420520c0d338ff7bc7a88c3dd0547))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([6a6fc35](https://github.com/mindmorass/obsidian-confluence/commit/6a6fc35a119c98ef6b17990b730ec2a0dc71485f))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([ccb7cc0](https://github.com/mindmorass/obsidian-confluence/commit/ccb7cc030be9816a4d61b67288fa70d948003e49))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([56496e9](https://github.com/mindmorass/obsidian-confluence/commit/56496e95459b0445b3a813f9343b064f56629ab9))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([69768b1](https://github.com/mindmorass/obsidian-confluence/commit/69768b1186d62b43be2db72ef270596e57c9cbd8))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([07eeca7](https://github.com/mindmorass/obsidian-confluence/commit/07eeca733ab5104397afcbe620015da91b13dfff))
* **deps:** bump yargs from 17.7.1 to 17.7.2 ([a91eabd](https://github.com/mindmorass/obsidian-confluence/commit/a91eabda6a6dab803b7eeab3b98d0457e4aef873))
## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/@markdown-confluence/cli-v5.5.2...@markdown-confluence/cli-v3.0.0) (2026-01-21)


###   BREAKING CHANGES

* No longer bundling the lib package to help with tree shaking and code navigation

### Features

* Add docker CLI ([e8f930f](https://github.com/mindmorass/obsidian-confluence/commit/e8f930fbeb612152cf19f5b387fb322b4c82bc5e))
* Allow setting content root for FilesystemAdaptor ([d008f29](https://github.com/mindmorass/obsidian-confluence/commit/d008f294170561cec8ebfc7aa54352fb34c8cc44))
* Basic output from CLI ([46b47bd](https://github.com/mindmorass/obsidian-confluence/commit/46b47bd1c01de77b7c3de62d76c6ec74388c56c5))
* Enable SourceMaps in Docker ([5f13f52](https://github.com/mindmorass/obsidian-confluence/commit/5f13f526ec1dc3326d3517a6080139d047c6e9ca))
* Handle 404 when pageId included in YAML. Set to not publish and remove bad pageId ([33dde01](https://github.com/mindmorass/obsidian-confluence/commit/33dde014ccc24368f065eec0a92dba3755644fc8))
* Initial CLI version ([85b4aff](https://github.com/mindmorass/obsidian-confluence/commit/85b4aff13921accf6dd376e18929f3a19087757e))
* Move ImageUpload and MermaidRendering to plugins to allow for more plugins easily ([cfae670](https://github.com/mindmorass/obsidian-confluence/commit/cfae670d3bc94c4a88d02936c94ca9c1ab47ce9e))
* Snyk container scanning ([710a4a0](https://github.com/mindmorass/obsidian-confluence/commit/710a4a0c6d544835c74bbfa31939745d7e4a7b0d))


### Bug Fixes

* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* Check for duplicate page titles not file names. ([540b1f9](https://github.com/mindmorass/obsidian-confluence/commit/540b1f93cd20784f9c7c8f14895221667fe5f3f5))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* docker build ordering ([0110108](https://github.com/mindmorass/obsidian-confluence/commit/0110108ed9e68a864f5d425d7e3a0547b058b39d))
* Don't publish with dependancies for the CLI since they are bundled. ([52b3396](https://github.com/mindmorass/obsidian-confluence/commit/52b33969f58ea97ec25ed5b830929e231895ab43))
* Move SettingsLoaders to own files to help with TreeShaking ([f241a11](https://github.com/mindmorass/obsidian-confluence/commit/f241a11a3967d8a06e827ec100dca15533d38902))
* Pin puppeteer Docker container ([d9d5f11](https://github.com/mindmorass/obsidian-confluence/commit/d9d5f11516582ec80a51cf0f137ba30d0a15ef8e))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Set puppeteer cache dir ([0643ad3](https://github.com/mindmorass/obsidian-confluence/commit/0643ad37690e9260ae9bdd649f1df1c5abe6ff65))
* Show better CLI error messages ([2120168](https://github.com/mindmorass/obsidian-confluence/commit/21201681a767c03f87a188b8ddfd8436435f0921))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))
* yargs is a dep of lib not cli ([aca0a8b](https://github.com/mindmorass/obsidian-confluence/commit/aca0a8bd259703850b6694c9f1bec01ac7d8205f))


### Dependencies

* **deps:** bump puppeteer/puppeteer in /packages/cli ([ca328b5](https://github.com/mindmorass/obsidian-confluence/commit/ca328b5ee2d7db1f9cd1caddf10505996a414a6e))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([3621e77](https://github.com/mindmorass/obsidian-confluence/commit/3621e775033111cb74430e8b39a1b1297d2a4f51))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([e603bdd](https://github.com/mindmorass/obsidian-confluence/commit/e603bdd3d3a8de6aaa84823bd7c7cf820073b9f9))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([912df0e](https://github.com/mindmorass/obsidian-confluence/commit/912df0e52e29d27292d463f484b873afcb9a967f))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([2cd503f](https://github.com/mindmorass/obsidian-confluence/commit/2cd503f4f41ba04038111c8c305d6d8a7a9cab8c))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([9af5ed9](https://github.com/mindmorass/obsidian-confluence/commit/9af5ed9d86eb90a19f9445ab22a808b22f9a4733))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([bd8fa02](https://github.com/mindmorass/obsidian-confluence/commit/bd8fa026d71420520c0d338ff7bc7a88c3dd0547))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([6a6fc35](https://github.com/mindmorass/obsidian-confluence/commit/6a6fc35a119c98ef6b17990b730ec2a0dc71485f))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([ccb7cc0](https://github.com/mindmorass/obsidian-confluence/commit/ccb7cc030be9816a4d61b67288fa70d948003e49))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([56496e9](https://github.com/mindmorass/obsidian-confluence/commit/56496e95459b0445b3a813f9343b064f56629ab9))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([69768b1](https://github.com/mindmorass/obsidian-confluence/commit/69768b1186d62b43be2db72ef270596e57c9cbd8))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([07eeca7](https://github.com/mindmorass/obsidian-confluence/commit/07eeca733ab5104397afcbe620015da91b13dfff))
* **deps:** bump yargs from 17.7.1 to 17.7.2 ([a91eabd](https://github.com/mindmorass/obsidian-confluence/commit/a91eabda6a6dab803b7eeab3b98d0457e4aef873))


### Documentation

* Add README.md files to all NPM Packages ([75c4781](https://github.com/mindmorass/obsidian-confluence/commit/75c47816b7895fd26d50382c316f83d6993cc56c))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))


### Documentation

* Add README.md files to all NPM Packages ([75c4781](https://github.com/mindmorass/obsidian-confluence/commit/75c47816b7895fd26d50382c316f83d6993cc56c))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))
</details>

<details><summary>@markdown-confluence/lib: 3.0.0</summary>

## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/@markdown-confluence/lib-v5.5.2...@markdown-confluence/lib-v3.0.0) (2026-01-21)


###   BREAKING CHANGES

* No longer bundling the lib package to help with tree shaking and code navigation

### Features

* Add "." option to folderToPublish to allow publishing whole contentRoot ([54c53ac](https://github.com/mindmorass/obsidian-confluence/commit/54c53ac6860b06a3d3f8e8e278b01be5d3ea333c))
* Add links to updated pages on Completed Dialog ([65c1a42](https://github.com/mindmorass/obsidian-confluence/commit/65c1a42b7b039512d5582b055f8adfb4f25333c8))
* Add new setting to allow you to use the first heading as the page title. ([ec4e426](https://github.com/mindmorass/obsidian-confluence/commit/ec4e426700d241c29f84ac25b28893f28f20a555))
* Add npm provenance ([ee76005](https://github.com/mindmorass/obsidian-confluence/commit/ee760054c80d9e385f559c18111b379f30fd3da0))
* Add support for "index.md" as a folder file ([f598074](https://github.com/mindmorass/obsidian-confluence/commit/f5980740cb99f0fa04cd0c66c6f5dba6ea78c288))
* Add support for mentions ([f17dd84](https://github.com/mindmorass/obsidian-confluence/commit/f17dd8460c7ee428846f1dc7adb4382ae3f772f2))
* ADF To Markdown ([7257893](https://github.com/mindmorass/obsidian-confluence/commit/725789372481baef6ba20aaf37a82dc5ca126b2e))
* Allow ConfigFile path to be provided as env var "CONFLUENCE_CONFIG_FILE" ([1311a93](https://github.com/mindmorass/obsidian-confluence/commit/1311a930c09963f932146e482d444ea9df8bd553))
* Allow setting content root for FilesystemAdaptor ([d008f29](https://github.com/mindmorass/obsidian-confluence/commit/d008f294170561cec8ebfc7aa54352fb34c8cc44))
* **blog:** Blog support. ([e0bdc24](https://github.com/mindmorass/obsidian-confluence/commit/e0bdc248c9845f4a609f7d9f9c7de388ea183b12))
* Custom ADF via Codeblock and adf language ([8e91630](https://github.com/mindmorass/obsidian-confluence/commit/8e916307b14654da4bc54bc71579e2a0283b365f))
* Diff page details to see if they have changed. If so then publish page. ([7e30ca8](https://github.com/mindmorass/obsidian-confluence/commit/7e30ca80f4feb93b2b86b85a4bec70c0e93edf91))
* Enable and fix all strict type checks ([c16ee2d](https://github.com/mindmorass/obsidian-confluence/commit/c16ee2d83b6e30065f8c607afda652c4c21af6b3))
* **FolderNote:** Add README.md and readme.md as options for folder note file names ([81ee277](https://github.com/mindmorass/obsidian-confluence/commit/81ee277694e742aa4ab0202d7ba8e563a5a67b95))
* Handle 404 when pageId included in YAML. Set to not publish and remove bad pageId ([33dde01](https://github.com/mindmorass/obsidian-confluence/commit/33dde014ccc24368f065eec0a92dba3755644fc8))
* Handle smartcards storing URL without page name on the end ([d489f83](https://github.com/mindmorass/obsidian-confluence/commit/d489f83b3f565bd986dd7fb801eb762142db8a13))
* Ignore comments when comparing pages to see if page has changed ([8cedbed](https://github.com/mindmorass/obsidian-confluence/commit/8cedbedeaac229a2ceec31a11d7494c35845064b))
* Initial CLI version ([85b4aff](https://github.com/mindmorass/obsidian-confluence/commit/85b4aff13921accf6dd376e18929f3a19087757e))
* Make ADF the same as what Confluence returns. ([a223c72](https://github.com/mindmorass/obsidian-confluence/commit/a223c72057fe154f3a47916fb97e1c92830bdf7c))
* Map Inline Comments with best effort ([b1d8db3](https://github.com/mindmorass/obsidian-confluence/commit/b1d8db3eb1d68ebc06c614052ea41693f47842e2))
* Mark lib as sideEffects: false to help treeshaking ([1a622e3](https://github.com/mindmorass/obsidian-confluence/commit/1a622e39cf5a84a86bcc7cbfd61eebd690a2ebfb))
* Move ImageUpload and MermaidRendering to plugins to allow for more plugins easily ([cfae670](https://github.com/mindmorass/obsidian-confluence/commit/cfae670d3bc94c4a88d02936c94ca9c1ab47ce9e))
* Update a page when you are the last modifier ([5c42d77](https://github.com/mindmorass/obsidian-confluence/commit/5c42d7787cf4c53098759ac221a81369e033df3d))
* Update Confluence Page Settings Command ([a7d395e](https://github.com/mindmorass/obsidian-confluence/commit/a7d395e5a2ddc9323a683bc9c877f8878740422a))
* Write `connie-publish: true` to all files that have been published to ensure even if you move the files they still will be published. ([a7d395e](https://github.com/mindmorass/obsidian-confluence/commit/a7d395e5a2ddc9323a683bc9c877f8878740422a))


### Bug Fixes

* Add keywords to lib package ([a3043b0](https://github.com/mindmorass/obsidian-confluence/commit/a3043b0bc87bf613c960b2296e4d6dfbdb7098ff))
* Add missing homepage and bugs to package.json ([c920345](https://github.com/mindmorass/obsidian-confluence/commit/c92034563ce2f8d11a40ed2c68b104807eace3be))
* Add repository information for providence ([362e025](https://github.com/mindmorass/obsidian-confluence/commit/362e0252bd24440f6311286e2b4446ffcf458dc4))
* Add settings to MdToADF Tests ([2c58c51](https://github.com/mindmorass/obsidian-confluence/commit/2c58c51795e1efe0a2abc99c8b4774954466a222))
* Bash to shell language map ([28ae75e](https://github.com/mindmorass/obsidian-confluence/commit/28ae75ed118d86841a00797d6f1bd12225551cc3))
* Bump lib ([18c4d27](https://github.com/mindmorass/obsidian-confluence/commit/18c4d27b07d21ed793bbb8492d83109afde1356d))
* bump markdown-it-table to v4.1.1 ([806eabe](https://github.com/mindmorass/obsidian-confluence/commit/806eabe5e05e7981b0367e1609d3c596830a4cff))
* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* Check for duplicate page titles not file names. ([540b1f9](https://github.com/mindmorass/obsidian-confluence/commit/540b1f93cd20784f9c7c8f14895221667fe5f3f5))
* Circular imports ([4f49798](https://github.com/mindmorass/obsidian-confluence/commit/4f49798ba17d5df40307aba208e637324ab79902))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* Don't load settings when first initialising Publisher. Fixes issue when no settings available in set up situation. ([ceb21e7](https://github.com/mindmorass/obsidian-confluence/commit/ceb21e7c193752394003545438d583323c0bccc6))
* Don't specify default for contentRoot on CommandLineArgumentSettingsLoader. ([ec8c338](https://github.com/mindmorass/obsidian-confluence/commit/ec8c3387dc4d324acf49853917f5ee8c95442e7e))
* Downgrade @atlaskit/adf-schema to fix issue ([914d324](https://github.com/mindmorass/obsidian-confluence/commit/914d32431594a81d0b57a77a9051877b025c1a1d))
* File test snapshots ([9944c42](https://github.com/mindmorass/obsidian-confluence/commit/9944c4213fb58e32815ac97a5212eb4af46ea5cf))
* Fix issues with puppeteer rendering ([01824b6](https://github.com/mindmorass/obsidian-confluence/commit/01824b60a2fc773550683a671d4ce2e4acb52855))
* frontmatterHeader adds content direct to ADF instead of Markdown now ([1230878](https://github.com/mindmorass/obsidian-confluence/commit/12308783ae23fbb2fbcd9f39871bf4429c47e18b))
* Handle ![](../image.png) images ([9ee3c8c](https://github.com/mindmorass/obsidian-confluence/commit/9ee3c8c37024a8dc1db3ac66ebb12aba9cb58140))
* Handle #hash links better for names that have spaces and handle internal links ([7ad345a](https://github.com/mindmorass/obsidian-confluence/commit/7ad345af210e346517535faa7a08d801b1660ded))
* Handle relative paths for images ([dbaba70](https://github.com/mindmorass/obsidian-confluence/commit/dbaba70dc5b2ca068543295de43a8a1674fb3baf))
* If environment variable is empty or "" then don't use. ([b0b7684](https://github.com/mindmorass/obsidian-confluence/commit/b0b7684f42906710929833f5883aab31fefc8e10))
* More debugging ([215ff9b](https://github.com/mindmorass/obsidian-confluence/commit/215ff9b619fa2adc2669a76c67a40ddb4f71fd93))
* Move SettingsLoaders to own files to help with TreeShaking ([f241a11](https://github.com/mindmorass/obsidian-confluence/commit/f241a11a3967d8a06e827ec100dca15533d38902))
* My bad ([1acc9b8](https://github.com/mindmorass/obsidian-confluence/commit/1acc9b8303948da962b0da614d74f8daf67eabff))
* NPM Access to Public ([74be60d](https://github.com/mindmorass/obsidian-confluence/commit/74be60d2db7eb106cb55202006b9afa1cb4fea2d))
* npm fmt ([206269c](https://github.com/mindmorass/obsidian-confluence/commit/206269cc887eb75659dd77673318715eb3db1457))
* Remove debug console.log ([bb56ed9](https://github.com/mindmorass/obsidian-confluence/commit/bb56ed9e30de8b70d6ab9be7aaf29d899d50a83d))
* Remove debug console.logs ([f89e617](https://github.com/mindmorass/obsidian-confluence/commit/f89e6178f63e42a85c0e25bfe180fea270b82bba))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Replace all spaces not just first one ([c01ae97](https://github.com/mindmorass/obsidian-confluence/commit/c01ae974445da898d69506fe754592d500b196f8))
* Replace spaces in hashFragment not linkToPage ([ed446e8](https://github.com/mindmorass/obsidian-confluence/commit/ed446e87a1a12d7014efeff37ae39e161b558e0c))
* Replace spaces with `-` to match what confluence uses. ([92b9d2d](https://github.com/mindmorass/obsidian-confluence/commit/92b9d2d9266ac777cc8ae4cbcd665f591a17b636))
* Settings path ([d1c43e6](https://github.com/mindmorass/obsidian-confluence/commit/d1c43e66bfe0e3c50a3a79d81e46659e3e3e75ee))
* Temp hack to show all files to be published ([d3539e9](https://github.com/mindmorass/obsidian-confluence/commit/d3539e9e503d16dd8277847f28214d8a7552d51f))
* Tests ([4f91706](https://github.com/mindmorass/obsidian-confluence/commit/4f91706e49cef54c53fce4729b155c4799686d1e))
* Trim and add back the contentRoot ([c48a9c0](https://github.com/mindmorass/obsidian-confluence/commit/c48a9c0171bf34655ac5b3826ae0b35fdb4085f1))
* ts errors in tests ([21f640e](https://github.com/mindmorass/obsidian-confluence/commit/21f640e96ea5bbc6ccdc9049679c3be95bafdaab))
* Update the common path to include parent ([076effd](https://github.com/mindmorass/obsidian-confluence/commit/076effdab718709df8c0a57faca917d3d152a41b))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))
* Wrap check for file in try catch to report the errors better ([3fabce0](https://github.com/mindmorass/obsidian-confluence/commit/3fabce0fb09573106552a37586bc1caf3883da6a))
* Wrong Ordering of AutoSettingsLoader Loaders ([4b1dc22](https://github.com/mindmorass/obsidian-confluence/commit/4b1dc22895001646b638997536706053bda7cbf2))
* yargs is a dep of lib not cli ([aca0a8b](https://github.com/mindmorass/obsidian-confluence/commit/aca0a8bd259703850b6694c9f1bec01ac7d8205f))


### Dependencies

* **deps:** bump @atlaskit/adf-schema from 25.10.1 to 26.2.1 ([6bbf385](https://github.com/mindmorass/obsidian-confluence/commit/6bbf385b3b9c071d8a86bfce8c33b6adaabb8b75))
* **deps:** bump @atlaskit/adf-schema from 25.6.2 to 25.6.4 ([fa96d3d](https://github.com/mindmorass/obsidian-confluence/commit/fa96d3da4605f506c99af4d9165c5c5188569e49))
* **deps:** bump @atlaskit/adf-schema from 26.2.1 to 26.3.0 ([6ef97ad](https://github.com/mindmorass/obsidian-confluence/commit/6ef97ad7c5ec8d0c413d74d1cb29ecf4d3c6f7d9))
* **deps:** bump @atlaskit/adf-schema from 26.4.1 to 29.2.0 ([db2745c](https://github.com/mindmorass/obsidian-confluence/commit/db2745c1a66b0b725c779d16215888ec01201598))
* **deps:** bump @atlaskit/adf-schema in /packages/lib ([b98b6fb](https://github.com/mindmorass/obsidian-confluence/commit/b98b6fba55316e46a0eee97761be6193eb8bf517))
* **deps:** bump @atlaskit/adf-utils from 18.2.1 to 18.2.3 ([ebc6895](https://github.com/mindmorass/obsidian-confluence/commit/ebc6895901a1c68f45d9493477ac1aec7b959032))
* **deps:** bump @atlaskit/adf-utils from 18.4.1 to 18.4.2 ([2d63294](https://github.com/mindmorass/obsidian-confluence/commit/2d632945a34f5ddc4a733266a320104cb532bf4a))
* **deps:** bump @atlaskit/adf-utils from 18.4.2 to 19.0.0 ([3a2fae1](https://github.com/mindmorass/obsidian-confluence/commit/3a2fae187d06483b3e3c6c4944d429479c702c1b))
* **deps:** bump @atlaskit/adf-utils in /packages/lib ([3b5ae81](https://github.com/mindmorass/obsidian-confluence/commit/3b5ae81d740f9519581e42b7e56896ad874bf7f2))
* **deps:** bump @atlaskit/editor-common from 72.9.0 to 74.0.1 ([769f692](https://github.com/mindmorass/obsidian-confluence/commit/769f6920c6982d9b094ab07eeeaa3f9ad2fbd427))
* **deps:** bump @atlaskit/editor-common from 74.1.1 to 74.2.1 ([366135b](https://github.com/mindmorass/obsidian-confluence/commit/366135b478f3178b8293767b1c97fa797fabb6ca))
* **deps:** bump @atlaskit/editor-common from 74.2.1 to 74.7.8 ([6287545](https://github.com/mindmorass/obsidian-confluence/commit/628754593d35675d607450f59ee5123afc92e5ac))
* **deps:** bump @atlaskit/editor-common from 74.29.0 to 74.34.4 ([62a82c6](https://github.com/mindmorass/obsidian-confluence/commit/62a82c6a96dc5cd4bec6d22b4e42954f6743f0c3))
* **deps:** bump @atlaskit/editor-common from 74.7.8 to 74.29.0 ([c543b7b](https://github.com/mindmorass/obsidian-confluence/commit/c543b7ba7251b6e70b6916b112de14852bc84993))
* **deps:** bump @atlaskit/editor-common in /packages/lib ([8f78eaf](https://github.com/mindmorass/obsidian-confluence/commit/8f78eaf7b5642ab0c84632987580e35da515b707))
* **deps:** bump @atlaskit/editor-json-transformer from 8.10.3 to 8.10.4 ([1803259](https://github.com/mindmorass/obsidian-confluence/commit/1803259e34e5c7b47b6d6aa121ec9517ba991e90))
* **deps:** bump @atlaskit/editor-json-transformer from 8.10.4 to 8.10.9 ([aa3797f](https://github.com/mindmorass/obsidian-confluence/commit/aa3797f3fd41db939dfc984932393a3397e1b0b7))
* **deps:** bump @atlaskit/editor-json-transformer from 8.8.3 to 8.8.4 ([b9a4496](https://github.com/mindmorass/obsidian-confluence/commit/b9a4496c9963b8da44dc89a602865077fa912028))
* **deps:** bump @atlaskit/editor-json-transformer from 8.8.4 to 8.9.1 ([cc6b4a9](https://github.com/mindmorass/obsidian-confluence/commit/cc6b4a91881024b224d79bcd8f1082c8b4c681d0))
* **deps:** bump @atlaskit/editor-json-transformer from 8.9.1 to 8.9.3 ([ce755a7](https://github.com/mindmorass/obsidian-confluence/commit/ce755a776f88f3b62c3e335d6685b7d769bcf154))
* **deps:** bump @atlaskit/editor-json-transformer from 8.9.3 to 8.9.4 ([dee45c7](https://github.com/mindmorass/obsidian-confluence/commit/dee45c7cdfbb48cf56a2582417af677982c87212))
* **deps:** bump @atlaskit/editor-json-transformer from 8.9.4 to 8.10.3 ([76ed649](https://github.com/mindmorass/obsidian-confluence/commit/76ed649f4421c5a437deeb4198aba46c7a59d86d))
* **deps:** bump formdata-node from 5.0.0 to 5.0.1 ([16322c8](https://github.com/mindmorass/obsidian-confluence/commit/16322c8e7e6da247f592fcb1633b80170e7ebe97))
* **deps:** bump glob from 10.2.2 to 10.2.4 ([94bbf5b](https://github.com/mindmorass/obsidian-confluence/commit/94bbf5bb29d9f1d2e0b950b5e18a0f8566122e6f))
* **deps:** bump glob from 10.2.4 to 10.2.7 ([ecb7c77](https://github.com/mindmorass/obsidian-confluence/commit/ecb7c77327cf699adc5471ac51af397f3b5dadb8))
* **deps:** bump markdown-it-table from 2.0.4 to 4.1.0 ([12d7a43](https://github.com/mindmorass/obsidian-confluence/commit/12d7a43efc351cc0e3f1cdf04d5bbb610ad74706))
* **deps:** bump prosemirror-markdown from 1.10.1 to 1.11.0 ([9d6ac07](https://github.com/mindmorass/obsidian-confluence/commit/9d6ac07ba8be7b8315e0a9e6e53e6b075f7e1c54))
* **deps:** bump prosemirror-model and @types/prosemirror-model ([37d6299](https://github.com/mindmorass/obsidian-confluence/commit/37d629962ff38c02f1c955ed25c8ad191dfff734))


### Documentation

* Add README.md files to all NPM Packages ([75c4781](https://github.com/mindmorass/obsidian-confluence/commit/75c47816b7895fd26d50382c316f83d6993cc56c))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))
</details>

<details><summary>@markdown-confluence/mermaid-electron-renderer: 3.0.0</summary>

## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/@markdown-confluence/mermaid-electron-renderer-v5.5.2...@markdown-confluence/mermaid-electron-renderer-v3.0.0) (2026-01-21)


### Features

* Add npm provenance ([ee76005](https://github.com/mindmorass/obsidian-confluence/commit/ee760054c80d9e385f559c18111b379f30fd3da0))
* Apply themes from Obsidian to Mermaid ([b599336](https://github.com/mindmorass/obsidian-confluence/commit/b5993369e03cdcc0bdbdd6c83f0b6a18dd8effaa))
* Make ADF the same as what Confluence returns. ([a223c72](https://github.com/mindmorass/obsidian-confluence/commit/a223c72057fe154f3a47916fb97e1c92830bdf7c))
* Make mermaid in electron simpler due to being ran in renderer already ([5668e02](https://github.com/mindmorass/obsidian-confluence/commit/5668e025299d46820ae50b25c1a542ced28097ec))


### Bug Fixes

* Add `@markdown-confluence/lib` to `markdown-electron-renderer` ([886556a](https://github.com/mindmorass/obsidian-confluence/commit/886556abfb0c2f297c032577b9ce55ed89213d14))
* Add missing homepage and bugs to package.json ([c920345](https://github.com/mindmorass/obsidian-confluence/commit/c92034563ce2f8d11a40ed2c68b104807eace3be))
* Add repository information for providence ([362e025](https://github.com/mindmorass/obsidian-confluence/commit/362e0252bd24440f6311286e2b4446ffcf458dc4))
* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* Fix issues with puppeteer rendering ([01824b6](https://github.com/mindmorass/obsidian-confluence/commit/01824b60a2fc773550683a671d4ce2e4acb52855))
* Improve plugin initial load time. Don't create the createObjectURL till first publishing time. ([2c11c8e](https://github.com/mindmorass/obsidian-confluence/commit/2c11c8e0057a4708b76f7ad93e07aa6d15b7548b))
* NPM Access to Public ([74be60d](https://github.com/mindmorass/obsidian-confluence/commit/74be60d2db7eb106cb55202006b9afa1cb4fea2d))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Run npm build before dev-obsidian to ensure all built ([da1fe60](https://github.com/mindmorass/obsidian-confluence/commit/da1fe60f75973165979e9632a35f33ab9146ebbf))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))


### Dependencies

* Clean up mermaid-electron-renderer package.json ([8137934](https://github.com/mindmorass/obsidian-confluence/commit/81379341178e28046174ceadcb74f271ac0dd10b))
* **deps:** bump mermaid from 10.1.0 to 10.2.0 ([d2b2080](https://github.com/mindmorass/obsidian-confluence/commit/d2b208067789868d4ac1072e07688183e2faf9f3))
* **deps:** bump mermaid from 10.2.0 to 10.2.3 ([d04cd97](https://github.com/mindmorass/obsidian-confluence/commit/d04cd97bbfe123e00f99578b079af7183f1df850))
## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/@markdown-confluence/mermaid-electron-renderer-v5.5.2...@markdown-confluence/mermaid-electron-renderer-v3.0.0) (2026-01-21)


### Features

* Add npm provenance ([ee76005](https://github.com/mindmorass/obsidian-confluence/commit/ee760054c80d9e385f559c18111b379f30fd3da0))
* Apply themes from Obsidian to Mermaid ([b599336](https://github.com/mindmorass/obsidian-confluence/commit/b5993369e03cdcc0bdbdd6c83f0b6a18dd8effaa))
* Make ADF the same as what Confluence returns. ([a223c72](https://github.com/mindmorass/obsidian-confluence/commit/a223c72057fe154f3a47916fb97e1c92830bdf7c))
* Make mermaid in electron simpler due to being ran in renderer already ([5668e02](https://github.com/mindmorass/obsidian-confluence/commit/5668e025299d46820ae50b25c1a542ced28097ec))


### Bug Fixes

* Add `@markdown-confluence/lib` to `markdown-electron-renderer` ([886556a](https://github.com/mindmorass/obsidian-confluence/commit/886556abfb0c2f297c032577b9ce55ed89213d14))
* Add missing homepage and bugs to package.json ([c920345](https://github.com/mindmorass/obsidian-confluence/commit/c92034563ce2f8d11a40ed2c68b104807eace3be))
* Add repository information for providence ([362e025](https://github.com/mindmorass/obsidian-confluence/commit/362e0252bd24440f6311286e2b4446ffcf458dc4))
* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* Fix issues with puppeteer rendering ([01824b6](https://github.com/mindmorass/obsidian-confluence/commit/01824b60a2fc773550683a671d4ce2e4acb52855))
* Improve plugin initial load time. Don't create the createObjectURL till first publishing time. ([2c11c8e](https://github.com/mindmorass/obsidian-confluence/commit/2c11c8e0057a4708b76f7ad93e07aa6d15b7548b))
* NPM Access to Public ([74be60d](https://github.com/mindmorass/obsidian-confluence/commit/74be60d2db7eb106cb55202006b9afa1cb4fea2d))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Run npm build before dev-obsidian to ensure all built ([da1fe60](https://github.com/mindmorass/obsidian-confluence/commit/da1fe60f75973165979e9632a35f33ab9146ebbf))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))


### Dependencies

* Clean up mermaid-electron-renderer package.json ([8137934](https://github.com/mindmorass/obsidian-confluence/commit/81379341178e28046174ceadcb74f271ac0dd10b))
* **deps:** bump mermaid from 10.1.0 to 10.2.0 ([d2b2080](https://github.com/mindmorass/obsidian-confluence/commit/d2b208067789868d4ac1072e07688183e2faf9f3))
* **deps:** bump mermaid from 10.2.0 to 10.2.3 ([d04cd97](https://github.com/mindmorass/obsidian-confluence/commit/d04cd97bbfe123e00f99578b079af7183f1df850))


### Documentation

* Add README.md files to all NPM Packages ([75c4781](https://github.com/mindmorass/obsidian-confluence/commit/75c47816b7895fd26d50382c316f83d6993cc56c))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))


### Documentation

* Add README.md files to all NPM Packages ([75c4781](https://github.com/mindmorass/obsidian-confluence/commit/75c47816b7895fd26d50382c316f83d6993cc56c))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))
</details>

<details><summary>@markdown-confluence/mermaid-puppeteer-renderer: 3.0.0</summary>

## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/@markdown-confluence/mermaid-puppeteer-renderer-v5.5.2...@markdown-confluence/mermaid-puppeteer-renderer-v3.0.0) (2026-01-21)


###   BREAKING CHANGES

* No longer bundling the lib package to help with tree shaking and code navigation

### Features

* Add docker CLI ([e8f930f](https://github.com/mindmorass/obsidian-confluence/commit/e8f930fbeb612152cf19f5b387fb322b4c82bc5e))
* Initial CLI version ([85b4aff](https://github.com/mindmorass/obsidian-confluence/commit/85b4aff13921accf6dd376e18929f3a19087757e))
* Make mermaid in electron simpler due to being ran in renderer already ([5668e02](https://github.com/mindmorass/obsidian-confluence/commit/5668e025299d46820ae50b25c1a542ced28097ec))


### Bug Fixes

* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* Call method on window in browser. ([38706d1](https://github.com/mindmorass/obsidian-confluence/commit/38706d13119ede06ed4e10c1e2db3ed9817920c1))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* Download browser for mermaid if required ([b6e45f0](https://github.com/mindmorass/obsidian-confluence/commit/b6e45f05cebcc6f8f7ae4f319a9ef166379add0e))
* Fix issues with puppeteer rendering ([01824b6](https://github.com/mindmorass/obsidian-confluence/commit/01824b60a2fc773550683a671d4ce2e4acb52855))
* Handle #hash links better for names that have spaces and handle internal links ([7ad345a](https://github.com/mindmorass/obsidian-confluence/commit/7ad345af210e346517535faa7a08d801b1660ded))
* HTML should be next to CLI ([9cefae1](https://github.com/mindmorass/obsidian-confluence/commit/9cefae132f930db5a2b964dd7199434875093e82))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Run npm build before dev-obsidian to ensure all built ([da1fe60](https://github.com/mindmorass/obsidian-confluence/commit/da1fe60f75973165979e9632a35f33ab9146ebbf))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))
* Write out puppeteer launch options to see why it can't find the browser ([fb3ca7f](https://github.com/mindmorass/obsidian-confluence/commit/fb3ca7f0a34e2202cdc62e6dd89f573cd434a0d4))


### Dependencies

* **deps:** bump mermaid from 10.1.0 to 10.2.0 ([d2b2080](https://github.com/mindmorass/obsidian-confluence/commit/d2b208067789868d4ac1072e07688183e2faf9f3))
* **deps:** bump mermaid from 10.2.0 to 10.2.3 ([d04cd97](https://github.com/mindmorass/obsidian-confluence/commit/d04cd97bbfe123e00f99578b079af7183f1df850))
* **deps:** bump mermaid in /packages/mermaid-puppeteer-renderer ([391a22d](https://github.com/mindmorass/obsidian-confluence/commit/391a22d244580052809437aff90d81e78f78df7d))
* **deps:** bump mermaid in /packages/mermaid-puppeteer-renderer ([386fa2c](https://github.com/mindmorass/obsidian-confluence/commit/386fa2c31a98d982d08e4009459f66f843857ba4))
* **deps:** bump mermaid in /packages/mermaid-puppeteer-renderer ([9d57988](https://github.com/mindmorass/obsidian-confluence/commit/9d579880906e499e8b3144042246f6abce790440))
* **deps:** bump puppeteer from 19.11.0 to 19.11.1 ([2be4945](https://github.com/mindmorass/obsidian-confluence/commit/2be4945c2682109f5742fdb8b8d5d3b32c7b0edc))
* **deps:** bump puppeteer from 19.11.1 to 20.0.0 ([def42aa](https://github.com/mindmorass/obsidian-confluence/commit/def42aa36725493bdafda9eb9809526ab7821aa5))
* **deps:** bump puppeteer from 20.0.0 to 20.1.2 ([1504a57](https://github.com/mindmorass/obsidian-confluence/commit/1504a57701539782078275f6b8a9445a68891a2a))
* **deps:** bump puppeteer from 20.1.2 to 20.3.0 ([37c8524](https://github.com/mindmorass/obsidian-confluence/commit/37c85241a0d0a134cb341daf99810d9895891a90))
* **deps:** bump puppeteer from 20.3.0 to 20.7.2 ([7ca65d5](https://github.com/mindmorass/obsidian-confluence/commit/7ca65d55cc9021afd49c4c37bc595e87da9f08af))
* **deps:** bump puppeteer from 20.7.3 to 20.8.0 ([16267cd](https://github.com/mindmorass/obsidian-confluence/commit/16267cdbaa87626c523f83556e0bb725d63431ba))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([2f8c4cd](https://github.com/mindmorass/obsidian-confluence/commit/2f8c4cd3d53b56abf2e28151e2b9d92c49aea63d))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([be818e5](https://github.com/mindmorass/obsidian-confluence/commit/be818e5fc7739c824527e8c209a62c3924555335))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([a681954](https://github.com/mindmorass/obsidian-confluence/commit/a6819545fcede72fbb647588a5d88bea0d3f69b8))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([1085023](https://github.com/mindmorass/obsidian-confluence/commit/108502344b9c18d9d5a0ca8b4e45560211dbd3fa))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([5d63b3b](https://github.com/mindmorass/obsidian-confluence/commit/5d63b3b4d23c7c2a40a9432b491a9a04471e8df4))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([cbebca5](https://github.com/mindmorass/obsidian-confluence/commit/cbebca5af5393dffd43762fa66c662e3b1326e76))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([146597b](https://github.com/mindmorass/obsidian-confluence/commit/146597bd1fc69cf08ac7fe883ea9967415ce8081))
## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/@markdown-confluence/mermaid-puppeteer-renderer-v5.5.2...@markdown-confluence/mermaid-puppeteer-renderer-v3.0.0) (2026-01-21)


###   BREAKING CHANGES

* No longer bundling the lib package to help with tree shaking and code navigation

### Features

* Add docker CLI ([e8f930f](https://github.com/mindmorass/obsidian-confluence/commit/e8f930fbeb612152cf19f5b387fb322b4c82bc5e))
* Initial CLI version ([85b4aff](https://github.com/mindmorass/obsidian-confluence/commit/85b4aff13921accf6dd376e18929f3a19087757e))
* Make mermaid in electron simpler due to being ran in renderer already ([5668e02](https://github.com/mindmorass/obsidian-confluence/commit/5668e025299d46820ae50b25c1a542ced28097ec))


### Bug Fixes

* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* Call method on window in browser. ([38706d1](https://github.com/mindmorass/obsidian-confluence/commit/38706d13119ede06ed4e10c1e2db3ed9817920c1))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* Download browser for mermaid if required ([b6e45f0](https://github.com/mindmorass/obsidian-confluence/commit/b6e45f05cebcc6f8f7ae4f319a9ef166379add0e))
* Fix issues with puppeteer rendering ([01824b6](https://github.com/mindmorass/obsidian-confluence/commit/01824b60a2fc773550683a671d4ce2e4acb52855))
* Handle #hash links better for names that have spaces and handle internal links ([7ad345a](https://github.com/mindmorass/obsidian-confluence/commit/7ad345af210e346517535faa7a08d801b1660ded))
* HTML should be next to CLI ([9cefae1](https://github.com/mindmorass/obsidian-confluence/commit/9cefae132f930db5a2b964dd7199434875093e82))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Run npm build before dev-obsidian to ensure all built ([da1fe60](https://github.com/mindmorass/obsidian-confluence/commit/da1fe60f75973165979e9632a35f33ab9146ebbf))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))
* Write out puppeteer launch options to see why it can't find the browser ([fb3ca7f](https://github.com/mindmorass/obsidian-confluence/commit/fb3ca7f0a34e2202cdc62e6dd89f573cd434a0d4))


### Dependencies

* **deps:** bump mermaid from 10.1.0 to 10.2.0 ([d2b2080](https://github.com/mindmorass/obsidian-confluence/commit/d2b208067789868d4ac1072e07688183e2faf9f3))
* **deps:** bump mermaid from 10.2.0 to 10.2.3 ([d04cd97](https://github.com/mindmorass/obsidian-confluence/commit/d04cd97bbfe123e00f99578b079af7183f1df850))
* **deps:** bump mermaid in /packages/mermaid-puppeteer-renderer ([391a22d](https://github.com/mindmorass/obsidian-confluence/commit/391a22d244580052809437aff90d81e78f78df7d))
* **deps:** bump mermaid in /packages/mermaid-puppeteer-renderer ([386fa2c](https://github.com/mindmorass/obsidian-confluence/commit/386fa2c31a98d982d08e4009459f66f843857ba4))
* **deps:** bump mermaid in /packages/mermaid-puppeteer-renderer ([9d57988](https://github.com/mindmorass/obsidian-confluence/commit/9d579880906e499e8b3144042246f6abce790440))
* **deps:** bump puppeteer from 19.11.0 to 19.11.1 ([2be4945](https://github.com/mindmorass/obsidian-confluence/commit/2be4945c2682109f5742fdb8b8d5d3b32c7b0edc))
* **deps:** bump puppeteer from 19.11.1 to 20.0.0 ([def42aa](https://github.com/mindmorass/obsidian-confluence/commit/def42aa36725493bdafda9eb9809526ab7821aa5))
* **deps:** bump puppeteer from 20.0.0 to 20.1.2 ([1504a57](https://github.com/mindmorass/obsidian-confluence/commit/1504a57701539782078275f6b8a9445a68891a2a))
* **deps:** bump puppeteer from 20.1.2 to 20.3.0 ([37c8524](https://github.com/mindmorass/obsidian-confluence/commit/37c85241a0d0a134cb341daf99810d9895891a90))
* **deps:** bump puppeteer from 20.3.0 to 20.7.2 ([7ca65d5](https://github.com/mindmorass/obsidian-confluence/commit/7ca65d55cc9021afd49c4c37bc595e87da9f08af))
* **deps:** bump puppeteer from 20.7.3 to 20.8.0 ([16267cd](https://github.com/mindmorass/obsidian-confluence/commit/16267cdbaa87626c523f83556e0bb725d63431ba))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([2f8c4cd](https://github.com/mindmorass/obsidian-confluence/commit/2f8c4cd3d53b56abf2e28151e2b9d92c49aea63d))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([be818e5](https://github.com/mindmorass/obsidian-confluence/commit/be818e5fc7739c824527e8c209a62c3924555335))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([a681954](https://github.com/mindmorass/obsidian-confluence/commit/a6819545fcede72fbb647588a5d88bea0d3f69b8))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([1085023](https://github.com/mindmorass/obsidian-confluence/commit/108502344b9c18d9d5a0ca8b4e45560211dbd3fa))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([5d63b3b](https://github.com/mindmorass/obsidian-confluence/commit/5d63b3b4d23c7c2a40a9432b491a9a04471e8df4))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([cbebca5](https://github.com/mindmorass/obsidian-confluence/commit/cbebca5af5393dffd43762fa66c662e3b1326e76))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([146597b](https://github.com/mindmorass/obsidian-confluence/commit/146597bd1fc69cf08ac7fe883ea9967415ce8081))


### Documentation

* Add README.md files to all NPM Packages ([75c4781](https://github.com/mindmorass/obsidian-confluence/commit/75c47816b7895fd26d50382c316f83d6993cc56c))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))


### Documentation

* Add README.md files to all NPM Packages ([75c4781](https://github.com/mindmorass/obsidian-confluence/commit/75c47816b7895fd26d50382c316f83d6993cc56c))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))
</details>

<details><summary>obsidian-confluence: 3.0.0</summary>

## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/obsidian-confluence-v5.5.2...obsidian-confluence-v3.0.0) (2026-01-21)


###   BREAKING CHANGES

* Remove ADFView. It adds a lot of complexity and size to Obsidian Plugin. If you need it log an issue and I will create a separate plugin for that feature.
* No longer bundling the lib package to help with tree shaking and code navigation

### Features

* Add links to updated pages on Completed Dialog ([65c1a42](https://github.com/mindmorass/obsidian-confluence/commit/65c1a42b7b039512d5582b055f8adfb4f25333c8))
* Add new setting to allow you to use the first heading as the page title. ([ec4e426](https://github.com/mindmorass/obsidian-confluence/commit/ec4e426700d241c29f84ac25b28893f28f20a555))
* ADF To Markdown ([7257893](https://github.com/mindmorass/obsidian-confluence/commit/725789372481baef6ba20aaf37a82dc5ca126b2e))
* Apply themes from Obsidian to Mermaid ([b599336](https://github.com/mindmorass/obsidian-confluence/commit/b5993369e03cdcc0bdbdd6c83f0b6a18dd8effaa))
* **blog:** Blog support. ([e0bdc24](https://github.com/mindmorass/obsidian-confluence/commit/e0bdc248c9845f4a609f7d9f9c7de388ea183b12))
* Enable and fix all strict type checks ([c16ee2d](https://github.com/mindmorass/obsidian-confluence/commit/c16ee2d83b6e30065f8c607afda652c4c21af6b3))
* Handle 404 when pageId included in YAML. Set to not publish and remove bad pageId ([33dde01](https://github.com/mindmorass/obsidian-confluence/commit/33dde014ccc24368f065eec0a92dba3755644fc8))
* Initial CLI version ([85b4aff](https://github.com/mindmorass/obsidian-confluence/commit/85b4aff13921accf6dd376e18929f3a19087757e))
* Make ADF the same as what Confluence returns. ([a223c72](https://github.com/mindmorass/obsidian-confluence/commit/a223c72057fe154f3a47916fb97e1c92830bdf7c))
* Map Inline Comments with best effort ([b1d8db3](https://github.com/mindmorass/obsidian-confluence/commit/b1d8db3eb1d68ebc06c614052ea41693f47842e2))
* Move ImageUpload and MermaidRendering to plugins to allow for more plugins easily ([cfae670](https://github.com/mindmorass/obsidian-confluence/commit/cfae670d3bc94c4a88d02936c94ca9c1ab47ce9e))
* Remove ADFView. It adds a lot of complexity and size to Obsidian Plugin ([74c8436](https://github.com/mindmorass/obsidian-confluence/commit/74c84360bf0fe2afeafd4d769f11b41a5f9d6e03))
* Update a page when you are the last modifier ([5c42d77](https://github.com/mindmorass/obsidian-confluence/commit/5c42d7787cf4c53098759ac221a81369e033df3d))
* Update Confluence Page Settings Command ([a7d395e](https://github.com/mindmorass/obsidian-confluence/commit/a7d395e5a2ddc9323a683bc9c877f8878740422a))
* Write `connie-publish: true` to all files that have been published to ensure even if you move the files they still will be published. ([a7d395e](https://github.com/mindmorass/obsidian-confluence/commit/a7d395e5a2ddc9323a683bc9c877f8878740422a))


### Bug Fixes

* Add missing homepage and bugs to package.json ([c920345](https://github.com/mindmorass/obsidian-confluence/commit/c92034563ce2f8d11a40ed2c68b104807eace3be))
* Bump obsidian version ([c42e0d2](https://github.com/mindmorass/obsidian-confluence/commit/c42e0d2335c52a4beddcb0273e17ad287b9166ea))
* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* Bump version ([a798554](https://github.com/mindmorass/obsidian-confluence/commit/a798554d470e880ab53f689412b0c6aeab269d2c))
* Bump version I hope ([39b93eb](https://github.com/mindmorass/obsidian-confluence/commit/39b93eba447f2a1f706ff6e65e7e8cabea08bf75))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* fmt ([91ff4e9](https://github.com/mindmorass/obsidian-confluence/commit/91ff4e99135b90709ab3f185873b98ce94eb7242))
* frontmatterHeader adds content direct to ADF instead of Markdown now ([1230878](https://github.com/mindmorass/obsidian-confluence/commit/12308783ae23fbb2fbcd9f39871bf4429c47e18b))
* Handle #hash links better for names that have spaces and handle internal links ([7ad345a](https://github.com/mindmorass/obsidian-confluence/commit/7ad345af210e346517535faa7a08d801b1660ded))
* Include README for Obsidian repo and copy obsidian package source into repo to be stamped with release tag ([0ac4de3](https://github.com/mindmorass/obsidian-confluence/commit/0ac4de3f2d37609c49dab043f47a51a83dd594f8))
* Move SettingsLoaders to own files to help with TreeShaking ([f241a11](https://github.com/mindmorass/obsidian-confluence/commit/f241a11a3967d8a06e827ec100dca15533d38902))
* noEmit for Obsidian package ([7a36a92](https://github.com/mindmorass/obsidian-confluence/commit/7a36a924f8bd8b97b53d6bdaf8132e8f36191192))
* npm fmt ([206269c](https://github.com/mindmorass/obsidian-confluence/commit/206269cc887eb75659dd77673318715eb3db1457))
* Only load CSS that exists for obsidian styles ([c825559](https://github.com/mindmorass/obsidian-confluence/commit/c825559c4c318d665996d4da0b2488666c44fcaa))
* **ReleasePlease:** Fix to use a different name for package due to the actual obsidian package ([3f94f7e](https://github.com/mindmorass/obsidian-confluence/commit/3f94f7e15745139f7530ae1f86b0334f7d6ff184))
* Remove ADFView from main.ts ([a21abbd](https://github.com/mindmorass/obsidian-confluence/commit/a21abbd28c8a63cc09989b0cf9ad7d43fc5e56ae))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))
* Updates requested https://github.com/obsidianmd/obsidian-releases/pull/1867#issuecomment-1512710718 ([47c4bf9](https://github.com/mindmorass/obsidian-confluence/commit/47c4bf9d6ba2efb70e2ae62d59623f13f5db9183))


### Dependencies

* adf-utils for Obsidian ([3784f95](https://github.com/mindmorass/obsidian-confluence/commit/3784f9536f642092330ca12f67fdf8047c7c88d3))
* **deps:** bump @atlaskit/editor-json-transformer from 8.8.3 to 8.8.4 ([b9a4496](https://github.com/mindmorass/obsidian-confluence/commit/b9a4496c9963b8da44dc89a602865077fa912028))
* **deps:** bump @atlaskit/renderer from 107.3.2 to 107.3.3 ([252f911](https://github.com/mindmorass/obsidian-confluence/commit/252f911d42bcdeee1febadfbd6e90e226416b990))
## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/obsidian-confluence-v5.5.2...obsidian-confluence-v3.0.0) (2026-01-21)


###   BREAKING CHANGES

* Remove ADFView. It adds a lot of complexity and size to Obsidian Plugin. If you need it log an issue and I will create a separate plugin for that feature.
* No longer bundling the lib package to help with tree shaking and code navigation

### Features

* Add links to updated pages on Completed Dialog ([65c1a42](https://github.com/mindmorass/obsidian-confluence/commit/65c1a42b7b039512d5582b055f8adfb4f25333c8))
* Add new setting to allow you to use the first heading as the page title. ([ec4e426](https://github.com/mindmorass/obsidian-confluence/commit/ec4e426700d241c29f84ac25b28893f28f20a555))
* ADF To Markdown ([7257893](https://github.com/mindmorass/obsidian-confluence/commit/725789372481baef6ba20aaf37a82dc5ca126b2e))
* Apply themes from Obsidian to Mermaid ([b599336](https://github.com/mindmorass/obsidian-confluence/commit/b5993369e03cdcc0bdbdd6c83f0b6a18dd8effaa))
* **blog:** Blog support. ([e0bdc24](https://github.com/mindmorass/obsidian-confluence/commit/e0bdc248c9845f4a609f7d9f9c7de388ea183b12))
* Enable and fix all strict type checks ([c16ee2d](https://github.com/mindmorass/obsidian-confluence/commit/c16ee2d83b6e30065f8c607afda652c4c21af6b3))
* Handle 404 when pageId included in YAML. Set to not publish and remove bad pageId ([33dde01](https://github.com/mindmorass/obsidian-confluence/commit/33dde014ccc24368f065eec0a92dba3755644fc8))
* Initial CLI version ([85b4aff](https://github.com/mindmorass/obsidian-confluence/commit/85b4aff13921accf6dd376e18929f3a19087757e))
* Make ADF the same as what Confluence returns. ([a223c72](https://github.com/mindmorass/obsidian-confluence/commit/a223c72057fe154f3a47916fb97e1c92830bdf7c))
* Map Inline Comments with best effort ([b1d8db3](https://github.com/mindmorass/obsidian-confluence/commit/b1d8db3eb1d68ebc06c614052ea41693f47842e2))
* Move ImageUpload and MermaidRendering to plugins to allow for more plugins easily ([cfae670](https://github.com/mindmorass/obsidian-confluence/commit/cfae670d3bc94c4a88d02936c94ca9c1ab47ce9e))
* Remove ADFView. It adds a lot of complexity and size to Obsidian Plugin ([74c8436](https://github.com/mindmorass/obsidian-confluence/commit/74c84360bf0fe2afeafd4d769f11b41a5f9d6e03))
* Update a page when you are the last modifier ([5c42d77](https://github.com/mindmorass/obsidian-confluence/commit/5c42d7787cf4c53098759ac221a81369e033df3d))
* Update Confluence Page Settings Command ([a7d395e](https://github.com/mindmorass/obsidian-confluence/commit/a7d395e5a2ddc9323a683bc9c877f8878740422a))
* Write `connie-publish: true` to all files that have been published to ensure even if you move the files they still will be published. ([a7d395e](https://github.com/mindmorass/obsidian-confluence/commit/a7d395e5a2ddc9323a683bc9c877f8878740422a))


### Bug Fixes

* Add missing homepage and bugs to package.json ([c920345](https://github.com/mindmorass/obsidian-confluence/commit/c92034563ce2f8d11a40ed2c68b104807eace3be))
* Bump obsidian version ([c42e0d2](https://github.com/mindmorass/obsidian-confluence/commit/c42e0d2335c52a4beddcb0273e17ad287b9166ea))
* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* Bump version ([a798554](https://github.com/mindmorass/obsidian-confluence/commit/a798554d470e880ab53f689412b0c6aeab269d2c))
* Bump version I hope ([39b93eb](https://github.com/mindmorass/obsidian-confluence/commit/39b93eba447f2a1f706ff6e65e7e8cabea08bf75))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* fmt ([91ff4e9](https://github.com/mindmorass/obsidian-confluence/commit/91ff4e99135b90709ab3f185873b98ce94eb7242))
* frontmatterHeader adds content direct to ADF instead of Markdown now ([1230878](https://github.com/mindmorass/obsidian-confluence/commit/12308783ae23fbb2fbcd9f39871bf4429c47e18b))
* Handle #hash links better for names that have spaces and handle internal links ([7ad345a](https://github.com/mindmorass/obsidian-confluence/commit/7ad345af210e346517535faa7a08d801b1660ded))
* Include README for Obsidian repo and copy obsidian package source into repo to be stamped with release tag ([0ac4de3](https://github.com/mindmorass/obsidian-confluence/commit/0ac4de3f2d37609c49dab043f47a51a83dd594f8))
* Move SettingsLoaders to own files to help with TreeShaking ([f241a11](https://github.com/mindmorass/obsidian-confluence/commit/f241a11a3967d8a06e827ec100dca15533d38902))
* noEmit for Obsidian package ([7a36a92](https://github.com/mindmorass/obsidian-confluence/commit/7a36a924f8bd8b97b53d6bdaf8132e8f36191192))
* npm fmt ([206269c](https://github.com/mindmorass/obsidian-confluence/commit/206269cc887eb75659dd77673318715eb3db1457))
* Only load CSS that exists for obsidian styles ([c825559](https://github.com/mindmorass/obsidian-confluence/commit/c825559c4c318d665996d4da0b2488666c44fcaa))
* **ReleasePlease:** Fix to use a different name for package due to the actual obsidian package ([3f94f7e](https://github.com/mindmorass/obsidian-confluence/commit/3f94f7e15745139f7530ae1f86b0334f7d6ff184))
* Remove ADFView from main.ts ([a21abbd](https://github.com/mindmorass/obsidian-confluence/commit/a21abbd28c8a63cc09989b0cf9ad7d43fc5e56ae))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))
* Updates requested https://github.com/obsidianmd/obsidian-releases/pull/1867#issuecomment-1512710718 ([47c4bf9](https://github.com/mindmorass/obsidian-confluence/commit/47c4bf9d6ba2efb70e2ae62d59623f13f5db9183))


### Dependencies

* adf-utils for Obsidian ([3784f95](https://github.com/mindmorass/obsidian-confluence/commit/3784f9536f642092330ca12f67fdf8047c7c88d3))
* **deps:** bump @atlaskit/editor-json-transformer from 8.8.3 to 8.8.4 ([b9a4496](https://github.com/mindmorass/obsidian-confluence/commit/b9a4496c9963b8da44dc89a602865077fa912028))
* **deps:** bump @atlaskit/renderer from 107.3.2 to 107.3.3 ([252f911](https://github.com/mindmorass/obsidian-confluence/commit/252f911d42bcdeee1febadfbd6e90e226416b990))


### Documentation

* Add note about logging issues to mono repo ([19992f6](https://github.com/mindmorass/obsidian-confluence/commit/19992f6705e0882025a1f8100b4ef42903df71e8))
* amended the broken readme image paths for obsidian package ([97876cf](https://github.com/mindmorass/obsidian-confluence/commit/97876cf7c55e3ac4de89d85a70dfd4ba4e8b3f15))
* Fix docs when they are published to obsidian-integration repo ([bb5887b](https://github.com/mindmorass/obsidian-confluence/commit/bb5887b96fcd27678c52552576defd0fda8dcf19))
* Update Obsidian docs to remove need for BRAT install ([9fc8fc8](https://github.com/mindmorass/obsidian-confluence/commit/9fc8fc8236c369b53c3d5bdcc63777525f30a0c9))
* Update repo and org names to match new names ([404a85b](https://github.com/mindmorass/obsidian-confluence/commit/404a85b206704873d57c233131ba4f564c4ccd86))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))


### Documentation

* Add note about logging issues to mono repo ([19992f6](https://github.com/mindmorass/obsidian-confluence/commit/19992f6705e0882025a1f8100b4ef42903df71e8))
* amended the broken readme image paths for obsidian package ([97876cf](https://github.com/mindmorass/obsidian-confluence/commit/97876cf7c55e3ac4de89d85a70dfd4ba4e8b3f15))
* Fix docs when they are published to obsidian-integration repo ([bb5887b](https://github.com/mindmorass/obsidian-confluence/commit/bb5887b96fcd27678c52552576defd0fda8dcf19))
* Update Obsidian docs to remove need for BRAT install ([9fc8fc8](https://github.com/mindmorass/obsidian-confluence/commit/9fc8fc8236c369b53c3d5bdcc63777525f30a0c9))
* Update repo and org names to match new names ([404a85b](https://github.com/mindmorass/obsidian-confluence/commit/404a85b206704873d57c233131ba4f564c4ccd86))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))
</details>

<details><summary>obsidian-confluence-root: 3.0.0</summary>

## [3.0.0](https://github.com/mindmorass/obsidian-confluence/compare/obsidian-confluence-root-v5.5.2...obsidian-confluence-root-v3.0.0) (2026-01-21)


###   BREAKING CHANGES

* Remove ADFView. It adds a lot of complexity and size to Obsidian Plugin. If you need it log an issue and I will create a separate plugin for that feature.
* No longer bundling the lib package to help with tree shaking and code navigation

### Features

* [StepSecurity] Apply security best practices ([#136](https://github.com/mindmorass/obsidian-confluence/issues/136)) ([b7b38a4](https://github.com/mindmorass/obsidian-confluence/commit/b7b38a42b2c21f91725f44f97ec1e98473e724a0))
* Add "." option to folderToPublish to allow publishing whole contentRoot ([54c53ac](https://github.com/mindmorass/obsidian-confluence/commit/54c53ac6860b06a3d3f8e8e278b01be5d3ea333c))
* Add docker CLI ([e8f930f](https://github.com/mindmorass/obsidian-confluence/commit/e8f930fbeb612152cf19f5b387fb322b4c82bc5e))
* Add links to updated pages on Completed Dialog ([65c1a42](https://github.com/mindmorass/obsidian-confluence/commit/65c1a42b7b039512d5582b055f8adfb4f25333c8))
* Add new setting to allow you to use the first heading as the page title. ([ec4e426](https://github.com/mindmorass/obsidian-confluence/commit/ec4e426700d241c29f84ac25b28893f28f20a555))
* Add npm provenance ([ee76005](https://github.com/mindmorass/obsidian-confluence/commit/ee760054c80d9e385f559c18111b379f30fd3da0))
* Add NPM publish after release is created ([2979a11](https://github.com/mindmorass/obsidian-confluence/commit/2979a11507c140436ce0ca236e86aca70991bfb9))
* Add OSSF Badge to README.md ([b6f5bf2](https://github.com/mindmorass/obsidian-confluence/commit/b6f5bf25295befee11e04362fd18d23a0d1350a5))
* Add OSSF Scorecard Scan ([f29c630](https://github.com/mindmorass/obsidian-confluence/commit/f29c630fc361718ef02d675feb79be73cc034057))
* Add PAT for Branch Protection Check ([b44a52e](https://github.com/mindmorass/obsidian-confluence/commit/b44a52e2ce41dc1c826957f9bad52b55a31d0ea0))
* Add snyk monitor ([e829018](https://github.com/mindmorass/obsidian-confluence/commit/e829018c728dbdaf68206a9292ee42c2ea689fa0))
* Add step-security/harden-runner to GHA ([f49c627](https://github.com/mindmorass/obsidian-confluence/commit/f49c6273b984120ad53f8b32b28f47cc5cd65a73))
* Add support for "index.md" as a folder file ([f598074](https://github.com/mindmorass/obsidian-confluence/commit/f5980740cb99f0fa04cd0c66c6f5dba6ea78c288))
* Add support for mentions ([f17dd84](https://github.com/mindmorass/obsidian-confluence/commit/f17dd8460c7ee428846f1dc7adb4382ae3f772f2))
* ADF To Markdown ([7257893](https://github.com/mindmorass/obsidian-confluence/commit/725789372481baef6ba20aaf37a82dc5ca126b2e))
* **AdfEqual:** Updates to make the ADF closer to what Confluence returns ([348f00e](https://github.com/mindmorass/obsidian-confluence/commit/348f00e3d98bf6843f886310eeadf75ca86be1e3))
* Allow ConfigFile path to be provided as env var "CONFLUENCE_CONFIG_FILE" ([1311a93](https://github.com/mindmorass/obsidian-confluence/commit/1311a930c09963f932146e482d444ea9df8bd553))
* Allow setting content root for FilesystemAdaptor ([d008f29](https://github.com/mindmorass/obsidian-confluence/commit/d008f294170561cec8ebfc7aa54352fb34c8cc44))
* Apply themes from Obsidian to Mermaid ([b599336](https://github.com/mindmorass/obsidian-confluence/commit/b5993369e03cdcc0bdbdd6c83f0b6a18dd8effaa))
* Basic output from CLI ([46b47bd](https://github.com/mindmorass/obsidian-confluence/commit/46b47bd1c01de77b7c3de62d76c6ec74388c56c5))
* **blog:** Blog support. ([e0bdc24](https://github.com/mindmorass/obsidian-confluence/commit/e0bdc248c9845f4a609f7d9f9c7de388ea183b12))
* **build:** Add `mermaidRendererPlugin.js` ([a64a176](https://github.com/mindmorass/obsidian-confluence/commit/a64a1763c8c440e8d826b8f4a8bc6aa304eafc38))
* **build:** Minify outputs to save size in main.js file ([c879d5d](https://github.com/mindmorass/obsidian-confluence/commit/c879d5ddb3f40376fea7b2ce903818865bcac175))
* **ci:** Export meta.json from esbuild ([c27ca7d](https://github.com/mindmorass/obsidian-confluence/commit/c27ca7d67230a5aa051c94407a69745dbcf83f81))
* Create CODEOWNERS ([a507ff9](https://github.com/mindmorass/obsidian-confluence/commit/a507ff96284384720d826fbf2446e359517aedf6))
* Create manual release to align with Obsidian requirements ([a9b90e5](https://github.com/mindmorass/obsidian-confluence/commit/a9b90e5cb1ad61fe56d33c5e8a6c0288c7f111a6))
* Create SECURITY.md ([06f8ba7](https://github.com/mindmorass/obsidian-confluence/commit/06f8ba7b9cdbc0938fd312609ed6e82877f108a4))
* Custom ADF via Codeblock and adf language ([8e91630](https://github.com/mindmorass/obsidian-confluence/commit/8e916307b14654da4bc54bc71579e2a0283b365f))
* Dependancy review comment with summary ([76597ac](https://github.com/mindmorass/obsidian-confluence/commit/76597acd6bd883eec1dee87b9d490b0b462de095))
* Diff page details to see if they have changed. If so then publish page. ([7e30ca8](https://github.com/mindmorass/obsidian-confluence/commit/7e30ca80f4feb93b2b86b85a4bec70c0e93edf91))
* Enable and fix all strict type checks ([c16ee2d](https://github.com/mindmorass/obsidian-confluence/commit/c16ee2d83b6e30065f8c607afda652c4c21af6b3))
* Enable SourceMaps in Docker ([5f13f52](https://github.com/mindmorass/obsidian-confluence/commit/5f13f526ec1dc3326d3517a6080139d047c6e9ca))
* **FolderNote:** Add README.md and readme.md as options for folder note file names ([81ee277](https://github.com/mindmorass/obsidian-confluence/commit/81ee277694e742aa4ab0202d7ba8e563a5a67b95))
* Handle 404 when pageId included in YAML. Set to not publish and remove bad pageId ([33dde01](https://github.com/mindmorass/obsidian-confluence/commit/33dde014ccc24368f065eec0a92dba3755644fc8))
* Handle smartcards storing URL without page name on the end ([d489f83](https://github.com/mindmorass/obsidian-confluence/commit/d489f83b3f565bd986dd7fb801eb762142db8a13))
* Ignore comments when comparing pages to see if page has changed ([8cedbed](https://github.com/mindmorass/obsidian-confluence/commit/8cedbedeaac229a2ceec31a11d7494c35845064b))
* Include stats/expanded file names on publish ([d618b66](https://github.com/mindmorass/obsidian-confluence/commit/d618b665521364ebfbea05a2713ff70f74630b91))
* Initial CLI version ([85b4aff](https://github.com/mindmorass/obsidian-confluence/commit/85b4aff13921accf6dd376e18929f3a19087757e))
* Lots of changes to enable better testing ([0ce560c](https://github.com/mindmorass/obsidian-confluence/commit/0ce560c3fb2c60edd4509d31ed99f52f500e2f13))
* Make ADF the same as what Confluence returns. ([a223c72](https://github.com/mindmorass/obsidian-confluence/commit/a223c72057fe154f3a47916fb97e1c92830bdf7c))
* Make mermaid in electron simpler due to being ran in renderer already ([5668e02](https://github.com/mindmorass/obsidian-confluence/commit/5668e025299d46820ae50b25c1a542ced28097ec))
* Map Inline Comments with best effort ([b1d8db3](https://github.com/mindmorass/obsidian-confluence/commit/b1d8db3eb1d68ebc06c614052ea41693f47842e2))
* Mark lib as sideEffects: false to help treeshaking ([1a622e3](https://github.com/mindmorass/obsidian-confluence/commit/1a622e39cf5a84a86bcc7cbfd61eebd690a2ebfb))
* Move ImageUpload and MermaidRendering to plugins to allow for more plugins easily ([cfae670](https://github.com/mindmorass/obsidian-confluence/commit/cfae670d3bc94c4a88d02936c94ca9c1ab47ce9e))
* Publish `mermaid-electron-renderer` ([351d78d](https://github.com/mindmorass/obsidian-confluence/commit/351d78d4cc9a9e06c2216a0dbfa60988bc76abf2))
* Remove ADFView. It adds a lot of complexity and size to Obsidian Plugin ([74c8436](https://github.com/mindmorass/obsidian-confluence/commit/74c84360bf0fe2afeafd4d769f11b41a5f9d6e03))
* Scan code with snyk ([#128](https://github.com/mindmorass/obsidian-confluence/issues/128)) ([118e46a](https://github.com/mindmorass/obsidian-confluence/commit/118e46ad413c9819d6c9f0f2076f9915a6667c80))
* Sign releases ([06ddd88](https://github.com/mindmorass/obsidian-confluence/commit/06ddd887e493d00d7e009252334d194e9a6527fb))
* Snyk container scanning ([710a4a0](https://github.com/mindmorass/obsidian-confluence/commit/710a4a0c6d544835c74bbfa31939745d7e4a7b0d))
* Tag docker with extra tags for Major and Major.Minor ([6ef7b65](https://github.com/mindmorass/obsidian-confluence/commit/6ef7b652105cc609d6023f8fa4243dade8d863a2))
* **tests:** Add initial unit tests and GH Actions to ensure they pass ([b7f636e](https://github.com/mindmorass/obsidian-confluence/commit/b7f636e2fb8e8a99c06cd60d227e38ae9e8d2873))
* Update a page when you are the last modifier ([5c42d77](https://github.com/mindmorass/obsidian-confluence/commit/5c42d7787cf4c53098759ac221a81369e033df3d))
* Update Confluence Page Settings Command ([a7d395e](https://github.com/mindmorass/obsidian-confluence/commit/a7d395e5a2ddc9323a683bc9c877f8878740422a))
* Update to publish to obsidian-integration repo ([c1b7b98](https://github.com/mindmorass/obsidian-confluence/commit/c1b7b983c6aeb7773d2e5b2ff77857682b250a1b))
* Write `connie-publish: true` to all files that have been published to ensure even if you move the files they still will be published. ([a7d395e](https://github.com/mindmorass/obsidian-confluence/commit/a7d395e5a2ddc9323a683bc9c877f8878740422a))


### Bug Fixes

* Add `@markdown-confluence/lib` to `markdown-electron-renderer` ([886556a](https://github.com/mindmorass/obsidian-confluence/commit/886556abfb0c2f297c032577b9ce55ed89213d14))
* Add better npm scripts ([6c227c7](https://github.com/mindmorass/obsidian-confluence/commit/6c227c77a7a6e01bfa062396b9d69231202527ea))
* Add category when uploading Sarif file ([3fb888b](https://github.com/mindmorass/obsidian-confluence/commit/3fb888b9600aea095892c50dc210779df709c240))
* Add GHA Perms ([#130](https://github.com/mindmorass/obsidian-confluence/issues/130)) ([2e35b30](https://github.com/mindmorass/obsidian-confluence/commit/2e35b30689b6b329585b0102ee4ddf1eafcd49dd))
* Add keywords to lib package ([a3043b0](https://github.com/mindmorass/obsidian-confluence/commit/a3043b0bc87bf613c960b2296e4d6dfbdb7098ff))
* Add manual component names ([9514e2f](https://github.com/mindmorass/obsidian-confluence/commit/9514e2f9344dbf9cea866902226a85aab339a4d2))
* Add missing homepage and bugs to package.json ([c920345](https://github.com/mindmorass/obsidian-confluence/commit/c92034563ce2f8d11a40ed2c68b104807eace3be))
* Add missing steps ([d65c90b](https://github.com/mindmorass/obsidian-confluence/commit/d65c90b2fd00f9a2594d2b3008259d6a0652635a))
* Add monitor for snyk containers to push to snyk for alerts ([284f016](https://github.com/mindmorass/obsidian-confluence/commit/284f016672e4e7cf97959c824a1ae98830ffa666))
* Add new manifest.json to allow new commit for release to be tagged against ([f35d0a4](https://github.com/mindmorass/obsidian-confluence/commit/f35d0a445531c413f52f40f7c57d2db80dd7c455))
* Add new projects to dependabot ([1d63186](https://github.com/mindmorass/obsidian-confluence/commit/1d63186fb5de78b129fec7bc9b02b2ccdbc959ee))
* Add permissions to root of all workflows ([a430221](https://github.com/mindmorass/obsidian-confluence/commit/a430221f89fb4af5290e5a54264375f59065dfb5))
* Add repository information for providence ([362e025](https://github.com/mindmorass/obsidian-confluence/commit/362e0252bd24440f6311286e2b4446ffcf458dc4))
* Add root component to `linked-versions` ([f2e1541](https://github.com/mindmorass/obsidian-confluence/commit/f2e1541ed97292a13b4493c905fef89b69b140fc))
* Add settings to MdToADF Tests ([2c58c51](https://github.com/mindmorass/obsidian-confluence/commit/2c58c51795e1efe0a2abc99c8b4774954466a222))
* Add version for root package ([afea12d](https://github.com/mindmorass/obsidian-confluence/commit/afea12d202e15be39e89542c8cba8a58aaf952f3))
* Attempt 10,000 fixing releases ([60d875a](https://github.com/mindmorass/obsidian-confluence/commit/60d875a134d16b2a7ef707d2ff4163657e27ad6a))
* Bash to shell language map ([28ae75e](https://github.com/mindmorass/obsidian-confluence/commit/28ae75ed118d86841a00797d6f1bd12225551cc3))
* bump @typescript-eslint/parser to same as @typescript-eslint/plugin to avoid peer dependency issues ([7a422cf](https://github.com/mindmorass/obsidian-confluence/commit/7a422cf3d1ebd22e1b6bea1b69caf171c559259c))
* Bump lib ([18c4d27](https://github.com/mindmorass/obsidian-confluence/commit/18c4d27b07d21ed793bbb8492d83109afde1356d))
* bump markdown-it-table to v4.1.1 ([806eabe](https://github.com/mindmorass/obsidian-confluence/commit/806eabe5e05e7981b0367e1609d3c596830a4cff))
* Bump obsidian version ([c42e0d2](https://github.com/mindmorass/obsidian-confluence/commit/c42e0d2335c52a4beddcb0273e17ad287b9166ea))
* Bump version ([f22975a](https://github.com/mindmorass/obsidian-confluence/commit/f22975a0899fa895b06f6ec3be6046d7958e08d5))
* Bump version ([a798554](https://github.com/mindmorass/obsidian-confluence/commit/a798554d470e880ab53f689412b0c6aeab269d2c))
* Bump version I hope ([39b93eb](https://github.com/mindmorass/obsidian-confluence/commit/39b93eba447f2a1f706ff6e65e7e8cabea08bf75))
* Call method on window in browser. ([38706d1](https://github.com/mindmorass/obsidian-confluence/commit/38706d13119ede06ed4e10c1e2db3ed9817920c1))
* Check for duplicate page titles not file names. ([540b1f9](https://github.com/mindmorass/obsidian-confluence/commit/540b1f93cd20784f9c7c8f14895221667fe5f3f5))
* **ci:** Fix errors ([ffeea5c](https://github.com/mindmorass/obsidian-confluence/commit/ffeea5c80bde3c5674716059e450b8c6963f8e9d))
* **ci:** Learn to check ([a494231](https://github.com/mindmorass/obsidian-confluence/commit/a494231840544e19cc8ac7bc090be6f327bc68dc))
* Circular imports ([4f49798](https://github.com/mindmorass/obsidian-confluence/commit/4f49798ba17d5df40307aba208e637324ab79902))
* **ci:** Run Release Please via PAT to allow GHA checks to run ([adb0708](https://github.com/mindmorass/obsidian-confluence/commit/adb07085f4bd026f994b5c8201abe0782e9b3828))
* Clean out obsidian-integration repo before copying in latest files ([02b3887](https://github.com/mindmorass/obsidian-confluence/commit/02b38872133ddb685e804901b97adbaa20d4283f))
* Commit to the right repo ([1cf7b40](https://github.com/mindmorass/obsidian-confluence/commit/1cf7b405a97156c611f00298e268994f677f75d2))
* Copy contents of obsidian folder not the folder as well ([abb3618](https://github.com/mindmorass/obsidian-confluence/commit/abb361873c0793ff515837044a2e079be855f4b8))
* correct nesting property for callout tokens to support multiple callouts ([f3a8f6d](https://github.com/mindmorass/obsidian-confluence/commit/f3a8f6d9d17067e23ceedc442181088dbd12ac75))
* Correct step name ([6721f30](https://github.com/mindmorass/obsidian-confluence/commit/6721f30ebd1ea168642a88d5eb880cce25ff36a8))
* dependabot config to be consistent ([4933c62](https://github.com/mindmorass/obsidian-confluence/commit/4933c6246e1db4c2996419ff3a1c8988667c9570))
* Dir path for copy ([0f499da](https://github.com/mindmorass/obsidian-confluence/commit/0f499dae4252a4053bde8de749ace04da69454dd))
* docker build ordering ([0110108](https://github.com/mindmorass/obsidian-confluence/commit/0110108ed9e68a864f5d425d7e3a0547b058b39d))
* Don't load settings when first initialising Publisher. Fixes issue when no settings available in set up situation. ([ceb21e7](https://github.com/mindmorass/obsidian-confluence/commit/ceb21e7c193752394003545438d583323c0bccc6))
* Don't publish till release created ([861ae0a](https://github.com/mindmorass/obsidian-confluence/commit/861ae0a0b12e649c2b0385ea417cdda81e1eae82))
* Don't publish with dependancies for the CLI since they are bundled. ([52b3396](https://github.com/mindmorass/obsidian-confluence/commit/52b33969f58ea97ec25ed5b830929e231895ab43))
* Don't specify default for contentRoot on CommandLineArgumentSettingsLoader. ([ec8c338](https://github.com/mindmorass/obsidian-confluence/commit/ec8c3387dc4d324acf49853917f5ee8c95442e7e))
* Downgrade @atlaskit/adf-schema to fix issue ([914d324](https://github.com/mindmorass/obsidian-confluence/commit/914d32431594a81d0b57a77a9051877b025c1a1d))
* Download browser for mermaid if required ([b6e45f0](https://github.com/mindmorass/obsidian-confluence/commit/b6e45f05cebcc6f8f7ae4f319a9ef166379add0e))
* Enable merge due to not having `linked-versions` ([8850884](https://github.com/mindmorass/obsidian-confluence/commit/8850884803b8168de9031de1d09cb56da2e6c11e))
* File test snapshots ([9944c42](https://github.com/mindmorass/obsidian-confluence/commit/9944c4213fb58e32815ac97a5212eb4af46ea5cf))
* Fix .eslintrc to resolve CodeQL error ([f27dd85](https://github.com/mindmorass/obsidian-confluence/commit/f27dd854e13a0af9b087fe6801bf070158141a96))
* Fix issues with puppeteer rendering ([01824b6](https://github.com/mindmorass/obsidian-confluence/commit/01824b60a2fc773550683a671d4ce2e4acb52855))
* Fix permissions syntax ([b7e585b](https://github.com/mindmorass/obsidian-confluence/commit/b7e585b5a46bb9bf8b2ca7af0bccdf1dff95063a))
* Fix upload-release-assets.sh git config ([6ce1b84](https://github.com/mindmorass/obsidian-confluence/commit/6ce1b84f0cd6544f0aac048e831fd822d236e321))
* Flip plugins order again ([3003b70](https://github.com/mindmorass/obsidian-confluence/commit/3003b704f9378cf180aaaaabe95feba3ea740b22))
* fmt ([91ff4e9](https://github.com/mindmorass/obsidian-confluence/commit/91ff4e99135b90709ab3f185873b98ce94eb7242))
* Force rename mdToADF to MdToADF ([9d0d483](https://github.com/mindmorass/obsidian-confluence/commit/9d0d4839b8540b423d794ab3d93d4ba071ede6dd))
* frontmatterHeader adds content direct to ADF instead of Markdown now ([1230878](https://github.com/mindmorass/obsidian-confluence/commit/12308783ae23fbb2fbcd9f39871bf4429c47e18b))
* git add for all files ([614f13c](https://github.com/mindmorass/obsidian-confluence/commit/614f13c0a74b750d76cd1f2a7b8374e84251b835))
* Group name ([cec80c5](https://github.com/mindmorass/obsidian-confluence/commit/cec80c50da2432477e033f3635f8fb27de246245))
* Handle ![](../image.png) images ([9ee3c8c](https://github.com/mindmorass/obsidian-confluence/commit/9ee3c8c37024a8dc1db3ac66ebb12aba9cb58140))
* Handle #hash links better for names that have spaces and handle internal links ([7ad345a](https://github.com/mindmorass/obsidian-confluence/commit/7ad345af210e346517535faa7a08d801b1660ded))
* Handle relative paths for images ([dbaba70](https://github.com/mindmorass/obsidian-confluence/commit/dbaba70dc5b2ca068543295de43a8a1674fb3baf))
* HTML should be next to CLI ([9cefae1](https://github.com/mindmorass/obsidian-confluence/commit/9cefae132f930db5a2b964dd7199434875093e82))
* id not name ([b7d5797](https://github.com/mindmorass/obsidian-confluence/commit/b7d579712f22ffecf9a634313823cd7f8659878c))
* If environment variable is empty or "" then don't use. ([b0b7684](https://github.com/mindmorass/obsidian-confluence/commit/b0b7684f42906710929833f5883aab31fefc8e10))
* Ignore error under eslint due to not being an issue ([e784c6c](https://github.com/mindmorass/obsidian-confluence/commit/e784c6ca1d2a6e2cae19c695cf8488ee60ce7056))
* Ignore vuln not being used ([619daca](https://github.com/mindmorass/obsidian-confluence/commit/619daca0e1adb8c24f5768abf9f3c412757f6c8a))
* **images:** Fix for image upload ([6b973f2](https://github.com/mindmorass/obsidian-confluence/commit/6b973f2fc2a97b299c1abb61708407c097a80706))
* Improve plugin initial load time. Don't create the createObjectURL till first publishing time. ([2c11c8e](https://github.com/mindmorass/obsidian-confluence/commit/2c11c8e0057a4708b76f7ad93e07aa6d15b7548b))
* Include README for Obsidian repo and copy obsidian package source into repo to be stamped with release tag ([0ac4de3](https://github.com/mindmorass/obsidian-confluence/commit/0ac4de3f2d37609c49dab043f47a51a83dd594f8))
* Manifest ([b87659e](https://github.com/mindmorass/obsidian-confluence/commit/b87659e8c780a77092b0c5de616feda20f9dcefa))
* Missed steps ([2487fe3](https://github.com/mindmorass/obsidian-confluence/commit/2487fe3891ec23082281bb66735729edeee517cb))
* Missed updating package-lock.json ([6bc63b9](https://github.com/mindmorass/obsidian-confluence/commit/6bc63b96ccc5e0f817b2c302a2701d7c6b3683b2))
* Missing components ([f495464](https://github.com/mindmorass/obsidian-confluence/commit/f4954649b6e770940076e9c390e1c78e8e6a0083))
* More debugging ([215ff9b](https://github.com/mindmorass/obsidian-confluence/commit/215ff9b619fa2adc2669a76c67a40ddb4f71fd93))
* Move "." to the bottom ([e3a68ce](https://github.com/mindmorass/obsidian-confluence/commit/e3a68cee680ac1f65f49577f537937a2ae502cfd))
* Move monitor to the right place ([fefccd5](https://github.com/mindmorass/obsidian-confluence/commit/fefccd5069ee0c3b002e5d8761b79a45a5d4e24b))
* Move SettingsLoaders to own files to help with TreeShaking ([f241a11](https://github.com/mindmorass/obsidian-confluence/commit/f241a11a3967d8a06e827ec100dca15533d38902))
* My bad ([1acc9b8](https://github.com/mindmorass/obsidian-confluence/commit/1acc9b8303948da962b0da614d74f8daf67eabff))
* noEmit for Obsidian package ([7a36a92](https://github.com/mindmorass/obsidian-confluence/commit/7a36a924f8bd8b97b53d6bdaf8132e8f36191192))
* NPM Access to Public ([74be60d](https://github.com/mindmorass/obsidian-confluence/commit/74be60d2db7eb106cb55202006b9afa1cb4fea2d))
* npm fmt ([206269c](https://github.com/mindmorass/obsidian-confluence/commit/206269cc887eb75659dd77673318715eb3db1457))
* Only build and release docker when release is created ([fe26002](https://github.com/mindmorass/obsidian-confluence/commit/fe260026267fa1974b712bd425238c9e1b347766))
* Only load CSS that exists for obsidian styles ([c825559](https://github.com/mindmorass/obsidian-confluence/commit/c825559c4c318d665996d4da0b2488666c44fcaa))
* Only remove component from tag name for Obsidian ([84c6628](https://github.com/mindmorass/obsidian-confluence/commit/84c662823f550906e7764127d8a3782cea308c43))
* package-lock.json out of date ([1468cb1](https://github.com/mindmorass/obsidian-confluence/commit/1468cb1a28050808def376531a26c8fd9968ca9c))
* Path in docs ([486bc74](https://github.com/mindmorass/obsidian-confluence/commit/486bc74e11a0f1a1292933e0684a22288906d57d))
* Pin dependancy in snyk.yml ([0498425](https://github.com/mindmorass/obsidian-confluence/commit/0498425f1f7d281e1d624f426eb4b6f6e41e5a5f))
* Pin npm in release-please.yml ([03da715](https://github.com/mindmorass/obsidian-confluence/commit/03da715085396a0af3b750cf12838f2ad7e11911))
* Pin puppeteer Docker container ([d9d5f11](https://github.com/mindmorass/obsidian-confluence/commit/d9d5f11516582ec80a51cf0f137ba30d0a15ef8e))
* **ReleasePlease:** Fix to use a different name for package due to the actual obsidian package ([3f94f7e](https://github.com/mindmorass/obsidian-confluence/commit/3f94f7e15745139f7530ae1f86b0334f7d6ff184))
* Remove ADFView from main.ts ([a21abbd](https://github.com/mindmorass/obsidian-confluence/commit/a21abbd28c8a63cc09989b0cf9ad7d43fc5e56ae))
* Remove comments ([78520de](https://github.com/mindmorass/obsidian-confluence/commit/78520de8ec5b8bf6b3ec88dc8bb27c60ff420fbf))
* Remove debug console.log ([bb56ed9](https://github.com/mindmorass/obsidian-confluence/commit/bb56ed9e30de8b70d6ab9be7aaf29d899d50a83d))
* Remove debug console.logs ([f89e617](https://github.com/mindmorass/obsidian-confluence/commit/f89e6178f63e42a85c0e25bfe180fea270b82bba))
* Remove wrong switch ([6528836](https://github.com/mindmorass/obsidian-confluence/commit/65288361aad87f1bd941fec58c227be49eb9dfd7))
* Rename `MainSettingTab` to `ConfluenceSettingTab` ([29ef8f2](https://github.com/mindmorass/obsidian-confluence/commit/29ef8f256305a13d520fc65c7a49064ed90aa296))
* Rename `MyPlugin` to `ConfluencePlugin` ([2298e27](https://github.com/mindmorass/obsidian-confluence/commit/2298e2787b29c5ca9ce030cbd3bee7b8698326a6))
* Rename `MyPluginSettings` to `ConfluenceSettings` ([25bdb97](https://github.com/mindmorass/obsidian-confluence/commit/25bdb97c85e79284c42bf89bd5b3a0cff1ebc10a))
* Rename frontmatter-to-publish to connie-frontmatter-to-publish ([d18d209](https://github.com/mindmorass/obsidian-confluence/commit/d18d20998fdd686a2aefe2aefbda33a4c2b86341))
* Rename links to align with repo rename ([742e98c](https://github.com/mindmorass/obsidian-confluence/commit/742e98c3b6d29caab074e7a09d744120069b2d99))
* Replace all spaces not just first one ([c01ae97](https://github.com/mindmorass/obsidian-confluence/commit/c01ae974445da898d69506fe754592d500b196f8))
* Replace spaces in hashFragment not linkToPage ([ed446e8](https://github.com/mindmorass/obsidian-confluence/commit/ed446e87a1a12d7014efeff37ae39e161b558e0c))
* Replace spaces with `-` to match what confluence uses. ([92b9d2d](https://github.com/mindmorass/obsidian-confluence/commit/92b9d2d9266ac777cc8ae4cbcd665f591a17b636))
* Root permissions all read as per https://github.com/ossf/scorecard/blob/376f465c111c39c6a5ad7408e8896cd790cb5219/docs/checks.md#token-permissions ([4560446](https://github.com/mindmorass/obsidian-confluence/commit/45604462575d96e9ac085c15eb45c9207fd1c232))
* Run `npm ci` to install dependancies ([58e894c](https://github.com/mindmorass/obsidian-confluence/commit/58e894cf4f9da903f847ed359099c0ea19543081))
* run monitor in docker action ([7fc1b91](https://github.com/mindmorass/obsidian-confluence/commit/7fc1b911d2194e835b6fefa3384e3e34cae90be2))
* Run npm build before dev-obsidian to ensure all built ([da1fe60](https://github.com/mindmorass/obsidian-confluence/commit/da1fe60f75973165979e9632a35f33ab9146ebbf))
* Run snyk on Dependabot PRs ([b16e2b1](https://github.com/mindmorass/obsidian-confluence/commit/b16e2b1aeb28310b5ca0d15e260518eda7f3ff38))
* Sarif output ([cfb277d](https://github.com/mindmorass/obsidian-confluence/commit/cfb277de330060c17cd8603b2d4d8386793a7862))
* Set puppeteer cache dir ([0643ad3](https://github.com/mindmorass/obsidian-confluence/commit/0643ad37690e9260ae9bdd649f1df1c5abe6ff65))
* Settings path ([d1c43e6](https://github.com/mindmorass/obsidian-confluence/commit/d1c43e66bfe0e3c50a3a79d81e46659e3e3e75ee))
* Show better CLI error messages ([2120168](https://github.com/mindmorass/obsidian-confluence/commit/21201681a767c03f87a188b8ddfd8436435f0921))
* Speed up builds ([fa77fc3](https://github.com/mindmorass/obsidian-confluence/commit/fa77fc336032a761a760d30998939f052e815b5a))
* Start work towards manual release ([3439f99](https://github.com/mindmorass/obsidian-confluence/commit/3439f997b0959a8471d224963fba8b650f6f529a))
* **stringifyObject:** Replacing stringify-object with JSON.stringify ([0297b44](https://github.com/mindmorass/obsidian-confluence/commit/0297b44b42af151e88d9a942a814b6dffabe5f20))
* Tag docker with correct version ([bb47286](https://github.com/mindmorass/obsidian-confluence/commit/bb4728631adaf9196da793a7e8c23f658154cb90))
* Temp hack to show all files to be published ([d3539e9](https://github.com/mindmorass/obsidian-confluence/commit/d3539e9e503d16dd8277847f28214d8a7552d51f))
* Test my local plugin ([c7f7d30](https://github.com/mindmorass/obsidian-confluence/commit/c7f7d30a1b3b6b32774c61c55452c9da95d2ab17))
* **test:** Extend test timeout ([ee38491](https://github.com/mindmorass/obsidian-confluence/commit/ee38491e4bb3073890cf6d7650356c31bab03063))
* **test:** Fix snapshot test to test passing all tests ([8e26790](https://github.com/mindmorass/obsidian-confluence/commit/8e26790ff219105ccfd54078239515164369b0b6))
* Tests ([4f91706](https://github.com/mindmorass/obsidian-confluence/commit/4f91706e49cef54c53fce4729b155c4799686d1e))
* Trim and add back the contentRoot ([c48a9c0](https://github.com/mindmorass/obsidian-confluence/commit/c48a9c0171bf34655ac5b3826ae0b35fdb4085f1))
* Try adding the component to PR title ([0b07269](https://github.com/mindmorass/obsidian-confluence/commit/0b0726960a6771be367d897916eb0820f7dcb02d))
* Try reordering plugins ([42706d9](https://github.com/mindmorass/obsidian-confluence/commit/42706d9f167fbdeb125477ac167326d8e939166a))
* ts errors in tests ([21f640e](https://github.com/mindmorass/obsidian-confluence/commit/21f640e96ea5bbc6ccdc9049679c3be95bafdaab))
* update actions/upload-artifact to v4.3.1 ([32c70c9](https://github.com/mindmorass/obsidian-confluence/commit/32c70c9f22dbf0a5a9a369ca5e91603d30f41381))
* Update config to be simpler ([6fff68e](https://github.com/mindmorass/obsidian-confluence/commit/6fff68ecc7b97119735e3c94878f4455e42c5bd0))
* Update package-lock.json ([66cf8cf](https://github.com/mindmorass/obsidian-confluence/commit/66cf8cf5d87eae7371ab1d473329cb921d8c064f))
* Update snyk org id ([945f87c](https://github.com/mindmorass/obsidian-confluence/commit/945f87c42d3c8245776452e4cf6c400498017ca0))
* Update the common path to include parent ([076effd](https://github.com/mindmorass/obsidian-confluence/commit/076effdab718709df8c0a57faca917d3d152a41b))
* Update Token to support packages ([73d3b54](https://github.com/mindmorass/obsidian-confluence/commit/73d3b544781c927cf847dfe34e839201cb5b92d2))
* Updates requested https://github.com/obsidianmd/obsidian-releases/pull/1867#issuecomment-1512710718 ([47c4bf9](https://github.com/mindmorass/obsidian-confluence/commit/47c4bf9d6ba2efb70e2ae62d59623f13f5db9183))
* Upload release assets ([95b5c61](https://github.com/mindmorass/obsidian-confluence/commit/95b5c61bf197441b556df630f3fc0837e9952ed4))
* Upload the right signed file ([ef7b176](https://github.com/mindmorass/obsidian-confluence/commit/ef7b17638f40c52e8cb23c4e09d538d2285ca1f3))
* use latest tag ([b7458ab](https://github.com/mindmorass/obsidian-confluence/commit/b7458ab9a1b771b3073b3fc39c0febb0b97808b0))
* Use package names not short names ([f851af4](https://github.com/mindmorass/obsidian-confluence/commit/f851af442df0d5986ae218248c229c5daec42220))
* Work around bug in release-please ([b740114](https://github.com/mindmorass/obsidian-confluence/commit/b74011475d85c5ca4551aba998b1ea3b8627a025))
* Wrap check for file in try catch to report the errors better ([3fabce0](https://github.com/mindmorass/obsidian-confluence/commit/3fabce0fb09573106552a37586bc1caf3883da6a))
* Write out puppeteer launch options to see why it can't find the browser ([fb3ca7f](https://github.com/mindmorass/obsidian-confluence/commit/fb3ca7f0a34e2202cdc62e6dd89f573cd434a0d4))
* Wrong Ordering of AutoSettingsLoader Loaders ([4b1dc22](https://github.com/mindmorass/obsidian-confluence/commit/4b1dc22895001646b638997536706053bda7cbf2))
* Wrong path for manifest.json ([8444d3f](https://github.com/mindmorass/obsidian-confluence/commit/8444d3f7f571e37e42565bddc403ac1dbd943eb7))
* yargs is a dep of lib not cli ([aca0a8b](https://github.com/mindmorass/obsidian-confluence/commit/aca0a8bd259703850b6694c9f1bec01ac7d8205f))


### Dependencies

* adf-utils for Obsidian ([3784f95](https://github.com/mindmorass/obsidian-confluence/commit/3784f9536f642092330ca12f67fdf8047c7c88d3))
* Clean up mermaid-electron-renderer package.json ([8137934](https://github.com/mindmorass/obsidian-confluence/commit/81379341178e28046174ceadcb74f271ac0dd10b))
* **deps:** bump @atlaskit/adf-schema from 25.10.1 to 26.2.1 ([6bbf385](https://github.com/mindmorass/obsidian-confluence/commit/6bbf385b3b9c071d8a86bfce8c33b6adaabb8b75))
* **deps:** bump @atlaskit/adf-schema from 25.6.2 to 25.6.4 ([fa96d3d](https://github.com/mindmorass/obsidian-confluence/commit/fa96d3da4605f506c99af4d9165c5c5188569e49))
* **deps:** bump @atlaskit/adf-schema from 26.2.1 to 26.3.0 ([6ef97ad](https://github.com/mindmorass/obsidian-confluence/commit/6ef97ad7c5ec8d0c413d74d1cb29ecf4d3c6f7d9))
* **deps:** bump @atlaskit/adf-schema from 26.4.1 to 29.2.0 ([db2745c](https://github.com/mindmorass/obsidian-confluence/commit/db2745c1a66b0b725c779d16215888ec01201598))
* **deps:** bump @atlaskit/adf-schema in /packages/lib ([b98b6fb](https://github.com/mindmorass/obsidian-confluence/commit/b98b6fba55316e46a0eee97761be6193eb8bf517))
* **deps:** bump @atlaskit/adf-utils from 18.2.1 to 18.2.3 ([ebc6895](https://github.com/mindmorass/obsidian-confluence/commit/ebc6895901a1c68f45d9493477ac1aec7b959032))
* **deps:** bump @atlaskit/adf-utils from 18.4.1 to 18.4.2 ([2d63294](https://github.com/mindmorass/obsidian-confluence/commit/2d632945a34f5ddc4a733266a320104cb532bf4a))
* **deps:** bump @atlaskit/adf-utils from 18.4.2 to 19.0.0 ([3a2fae1](https://github.com/mindmorass/obsidian-confluence/commit/3a2fae187d06483b3e3c6c4944d429479c702c1b))
* **deps:** bump @atlaskit/adf-utils in /packages/lib ([3b5ae81](https://github.com/mindmorass/obsidian-confluence/commit/3b5ae81d740f9519581e42b7e56896ad874bf7f2))
* **deps:** bump @atlaskit/editor-common from 72.9.0 to 74.0.1 ([769f692](https://github.com/mindmorass/obsidian-confluence/commit/769f6920c6982d9b094ab07eeeaa3f9ad2fbd427))
* **deps:** bump @atlaskit/editor-common from 74.1.1 to 74.2.1 ([366135b](https://github.com/mindmorass/obsidian-confluence/commit/366135b478f3178b8293767b1c97fa797fabb6ca))
* **deps:** bump @atlaskit/editor-common from 74.2.1 to 74.7.8 ([6287545](https://github.com/mindmorass/obsidian-confluence/commit/628754593d35675d607450f59ee5123afc92e5ac))
* **deps:** bump @atlaskit/editor-common from 74.29.0 to 74.34.4 ([62a82c6](https://github.com/mindmorass/obsidian-confluence/commit/62a82c6a96dc5cd4bec6d22b4e42954f6743f0c3))
* **deps:** bump @atlaskit/editor-common from 74.7.8 to 74.29.0 ([c543b7b](https://github.com/mindmorass/obsidian-confluence/commit/c543b7ba7251b6e70b6916b112de14852bc84993))
* **deps:** bump @atlaskit/editor-common in /packages/lib ([8f78eaf](https://github.com/mindmorass/obsidian-confluence/commit/8f78eaf7b5642ab0c84632987580e35da515b707))
* **deps:** bump @atlaskit/editor-json-transformer from 8.10.3 to 8.10.4 ([1803259](https://github.com/mindmorass/obsidian-confluence/commit/1803259e34e5c7b47b6d6aa121ec9517ba991e90))
* **deps:** bump @atlaskit/editor-json-transformer from 8.10.4 to 8.10.9 ([aa3797f](https://github.com/mindmorass/obsidian-confluence/commit/aa3797f3fd41db939dfc984932393a3397e1b0b7))
* **deps:** bump @atlaskit/editor-json-transformer from 8.8.3 to 8.8.4 ([b9a4496](https://github.com/mindmorass/obsidian-confluence/commit/b9a4496c9963b8da44dc89a602865077fa912028))
* **deps:** bump @atlaskit/editor-json-transformer from 8.8.4 to 8.9.1 ([cc6b4a9](https://github.com/mindmorass/obsidian-confluence/commit/cc6b4a91881024b224d79bcd8f1082c8b4c681d0))
* **deps:** bump @atlaskit/editor-json-transformer from 8.9.1 to 8.9.3 ([ce755a7](https://github.com/mindmorass/obsidian-confluence/commit/ce755a776f88f3b62c3e335d6685b7d769bcf154))
* **deps:** bump @atlaskit/editor-json-transformer from 8.9.3 to 8.9.4 ([dee45c7](https://github.com/mindmorass/obsidian-confluence/commit/dee45c7cdfbb48cf56a2582417af677982c87212))
* **deps:** bump @atlaskit/editor-json-transformer from 8.9.4 to 8.10.3 ([76ed649](https://github.com/mindmorass/obsidian-confluence/commit/76ed649f4421c5a437deeb4198aba46c7a59d86d))
* **deps:** bump @atlaskit/renderer from 107.2.0 to 107.3.2 ([7ae7a58](https://github.com/mindmorass/obsidian-confluence/commit/7ae7a58ebdca4a516eba61504ef3299d4c42f6ce))
* **deps:** bump @atlaskit/renderer from 107.3.2 to 107.3.3 ([252f911](https://github.com/mindmorass/obsidian-confluence/commit/252f911d42bcdeee1febadfbd6e90e226416b990))
* **deps:** bump actions/checkout from 3.1.0 to 3.5.2 ([7720376](https://github.com/mindmorass/obsidian-confluence/commit/77203764c82d6f3b68807e240fc7a3eca3061913))
* **deps:** bump actions/checkout from 3.5.2 to 3.5.3 ([ccf0820](https://github.com/mindmorass/obsidian-confluence/commit/ccf082059f9e4ae8a0094e7f9de518fef4837802))
* **deps:** bump actions/checkout from 3.5.3 to 4.0.0 ([52904f3](https://github.com/mindmorass/obsidian-confluence/commit/52904f352e04f19302231b9d73b3822e25e6e479))
* **deps:** bump actions/checkout from 3.5.3 to 4.1.0 ([9ab8b38](https://github.com/mindmorass/obsidian-confluence/commit/9ab8b38b7bad5041020ff4f81b6b3d68ec698a8a))
* **deps:** bump actions/dependency-review-action from 3.0.4 to 3.0.6 ([550a22f](https://github.com/mindmorass/obsidian-confluence/commit/550a22f25d441e1295832aad7896827199f0eefd))
* **deps:** bump actions/dependency-review-action from 3.0.6 to 3.1.0 ([94a3388](https://github.com/mindmorass/obsidian-confluence/commit/94a3388852f9a3cc60b690988eb75701146829ac))
* **deps:** bump actions/setup-node from 3.6.0 to 3.7.0 ([489d3c4](https://github.com/mindmorass/obsidian-confluence/commit/489d3c461e0dfc4a1d69c3f494f78f78357760f0))
* **deps:** bump actions/setup-node from 3.7.0 to 3.8.1 ([231817f](https://github.com/mindmorass/obsidian-confluence/commit/231817f338d5fc69cebc023c6b57166406e9abfc))
* **deps:** bump docker/build-push-action ([f6eaf6d](https://github.com/mindmorass/obsidian-confluence/commit/f6eaf6d37972f56754f1195f8db457ed41d7a0e2))
* **deps:** bump docker/build-push-action ([a3274e8](https://github.com/mindmorass/obsidian-confluence/commit/a3274e8596afe1a4bd7473bf01da29fcf27ba6c0))
* **deps:** bump docker/build-push-action ([5c99424](https://github.com/mindmorass/obsidian-confluence/commit/5c99424d647625c7ea5f6d16147b87584faa315b))
* **deps:** bump docker/build-push-action from 4.1.0 to 4.1.1 ([a8c1037](https://github.com/mindmorass/obsidian-confluence/commit/a8c1037d4b2a436cd35a282ca2cca2edd3d462b7))
* **deps:** bump docker/build-push-action from 4.1.1 to 5.0.0 ([ba1d845](https://github.com/mindmorass/obsidian-confluence/commit/ba1d8457fd5bdbadac181516353b29da6e8275cb))
* **deps:** bump docker/login-action ([c81bf32](https://github.com/mindmorass/obsidian-confluence/commit/c81bf320bd545916eb9df0d862d5286cc389d14c))
* **deps:** bump docker/login-action ([c7fde60](https://github.com/mindmorass/obsidian-confluence/commit/c7fde60cd2ec87561cff55c155eb03789734ddf3))
* **deps:** bump docker/metadata-action ([289e598](https://github.com/mindmorass/obsidian-confluence/commit/289e59832bfc2429a105f5ab23384cd54b294d3b))
* **deps:** bump docker/metadata-action from 4.4.0 to 4.5.0 ([161e8fd](https://github.com/mindmorass/obsidian-confluence/commit/161e8fd0a32dacde11c7609c9910955b0460f345))
* **deps:** bump docker/metadata-action from 4.5.0 to 4.6.0 ([ff4d14b](https://github.com/mindmorass/obsidian-confluence/commit/ff4d14b3b67386b3ae880d806b728abe9164c04d))
* **deps:** bump formdata-node from 5.0.0 to 5.0.1 ([16322c8](https://github.com/mindmorass/obsidian-confluence/commit/16322c8e7e6da247f592fcb1633b80170e7ebe97))
* **deps:** bump github/codeql-action from 2.2.12 to 2.3.0 ([2c4d081](https://github.com/mindmorass/obsidian-confluence/commit/2c4d081a3733ff527b993663662698cace53887f))
* **deps:** bump github/codeql-action from 2.3.0 to 2.3.1 ([378c2b7](https://github.com/mindmorass/obsidian-confluence/commit/378c2b74bc41794ab263d00fcef5f4a45d82908a))
* **deps:** bump github/codeql-action from 2.3.1 to 2.3.2 ([f960fb3](https://github.com/mindmorass/obsidian-confluence/commit/f960fb3b24ea42e081b9dff9bafc4aa032a834d4))
* **deps:** bump github/codeql-action from 2.3.2 to 2.3.3 ([d1ee1ea](https://github.com/mindmorass/obsidian-confluence/commit/d1ee1ea209e69179a7ffb672f0907468846a323c))
* **deps:** bump github/codeql-action from 2.3.3 to 2.3.5 ([c227142](https://github.com/mindmorass/obsidian-confluence/commit/c227142f8b0ee18d89f5035285c7baa4652360f8))
* **deps:** bump github/codeql-action from 2.3.5 to 2.13.4 ([7736586](https://github.com/mindmorass/obsidian-confluence/commit/77365865eafc294aff1990ed992ceafec5cd9a05))
* **deps:** bump glob from 10.2.2 to 10.2.4 ([94bbf5b](https://github.com/mindmorass/obsidian-confluence/commit/94bbf5bb29d9f1d2e0b950b5e18a0f8566122e6f))
* **deps:** bump glob from 10.2.4 to 10.2.7 ([ecb7c77](https://github.com/mindmorass/obsidian-confluence/commit/ecb7c77327cf699adc5471ac51af397f3b5dadb8))
* **deps:** bump google-github-actions/release-please-action ([b63a078](https://github.com/mindmorass/obsidian-confluence/commit/b63a078f4c52ce1254044e4515c3d07f15ae1fbc))
* **deps:** bump google-github-actions/release-please-action ([40bb951](https://github.com/mindmorass/obsidian-confluence/commit/40bb951651689769ec5dff8b2ab65a6c2d7884eb))
* **deps:** bump google-github-actions/release-please-action ([bb40179](https://github.com/mindmorass/obsidian-confluence/commit/bb40179474ed1df6957cb7b3058259ce51d29fd6))
* **deps:** bump markdown-it-table from 2.0.4 to 4.1.0 ([12d7a43](https://github.com/mindmorass/obsidian-confluence/commit/12d7a43efc351cc0e3f1cdf04d5bbb610ad74706))
* **deps:** bump mermaid from 10.1.0 to 10.2.0 ([d2b2080](https://github.com/mindmorass/obsidian-confluence/commit/d2b208067789868d4ac1072e07688183e2faf9f3))
* **deps:** bump mermaid from 10.2.0 to 10.2.3 ([d04cd97](https://github.com/mindmorass/obsidian-confluence/commit/d04cd97bbfe123e00f99578b079af7183f1df850))
* **deps:** bump mermaid in /packages/mermaid-puppeteer-renderer ([391a22d](https://github.com/mindmorass/obsidian-confluence/commit/391a22d244580052809437aff90d81e78f78df7d))
* **deps:** bump mermaid in /packages/mermaid-puppeteer-renderer ([386fa2c](https://github.com/mindmorass/obsidian-confluence/commit/386fa2c31a98d982d08e4009459f66f843857ba4))
* **deps:** bump mermaid in /packages/mermaid-puppeteer-renderer ([9d57988](https://github.com/mindmorass/obsidian-confluence/commit/9d579880906e499e8b3144042246f6abce790440))
* **deps:** bump ossf/scorecard-action from 2.1.3 to 2.2.0 ([9ae6b39](https://github.com/mindmorass/obsidian-confluence/commit/9ae6b3903372779101b7708bdbb78a79e5648d5b))
* **deps:** bump prosemirror-markdown from 1.10.1 to 1.11.0 ([9d6ac07](https://github.com/mindmorass/obsidian-confluence/commit/9d6ac07ba8be7b8315e0a9e6e53e6b075f7e1c54))
* **deps:** bump prosemirror-model and @types/prosemirror-model ([37d6299](https://github.com/mindmorass/obsidian-confluence/commit/37d629962ff38c02f1c955ed25c8ad191dfff734))
* **deps:** bump puppeteer from 19.11.0 to 19.11.1 ([2be4945](https://github.com/mindmorass/obsidian-confluence/commit/2be4945c2682109f5742fdb8b8d5d3b32c7b0edc))
* **deps:** bump puppeteer from 19.11.1 to 20.0.0 ([def42aa](https://github.com/mindmorass/obsidian-confluence/commit/def42aa36725493bdafda9eb9809526ab7821aa5))
* **deps:** bump puppeteer from 20.0.0 to 20.1.2 ([1504a57](https://github.com/mindmorass/obsidian-confluence/commit/1504a57701539782078275f6b8a9445a68891a2a))
* **deps:** bump puppeteer from 20.1.2 to 20.3.0 ([37c8524](https://github.com/mindmorass/obsidian-confluence/commit/37c85241a0d0a134cb341daf99810d9895891a90))
* **deps:** bump puppeteer from 20.3.0 to 20.7.2 ([7ca65d5](https://github.com/mindmorass/obsidian-confluence/commit/7ca65d55cc9021afd49c4c37bc595e87da9f08af))
* **deps:** bump puppeteer from 20.7.3 to 20.8.0 ([16267cd](https://github.com/mindmorass/obsidian-confluence/commit/16267cdbaa87626c523f83556e0bb725d63431ba))
* **deps:** bump puppeteer from 20.8.0 to 20.9.0 ([d2a85b1](https://github.com/mindmorass/obsidian-confluence/commit/d2a85b192d09e7ceb28220d2e2498b789bcba2f1))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([2f8c4cd](https://github.com/mindmorass/obsidian-confluence/commit/2f8c4cd3d53b56abf2e28151e2b9d92c49aea63d))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([be818e5](https://github.com/mindmorass/obsidian-confluence/commit/be818e5fc7739c824527e8c209a62c3924555335))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([a681954](https://github.com/mindmorass/obsidian-confluence/commit/a6819545fcede72fbb647588a5d88bea0d3f69b8))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([1085023](https://github.com/mindmorass/obsidian-confluence/commit/108502344b9c18d9d5a0ca8b4e45560211dbd3fa))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([5d63b3b](https://github.com/mindmorass/obsidian-confluence/commit/5d63b3b4d23c7c2a40a9432b491a9a04471e8df4))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([cbebca5](https://github.com/mindmorass/obsidian-confluence/commit/cbebca5af5393dffd43762fa66c662e3b1326e76))
* **deps:** bump puppeteer in /packages/mermaid-puppeteer-renderer ([146597b](https://github.com/mindmorass/obsidian-confluence/commit/146597bd1fc69cf08ac7fe883ea9967415ce8081))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([ca328b5](https://github.com/mindmorass/obsidian-confluence/commit/ca328b5ee2d7db1f9cd1caddf10505996a414a6e))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([3621e77](https://github.com/mindmorass/obsidian-confluence/commit/3621e775033111cb74430e8b39a1b1297d2a4f51))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([e603bdd](https://github.com/mindmorass/obsidian-confluence/commit/e603bdd3d3a8de6aaa84823bd7c7cf820073b9f9))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([912df0e](https://github.com/mindmorass/obsidian-confluence/commit/912df0e52e29d27292d463f484b873afcb9a967f))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([2cd503f](https://github.com/mindmorass/obsidian-confluence/commit/2cd503f4f41ba04038111c8c305d6d8a7a9cab8c))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([9af5ed9](https://github.com/mindmorass/obsidian-confluence/commit/9af5ed9d86eb90a19f9445ab22a808b22f9a4733))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([bd8fa02](https://github.com/mindmorass/obsidian-confluence/commit/bd8fa026d71420520c0d338ff7bc7a88c3dd0547))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([6a6fc35](https://github.com/mindmorass/obsidian-confluence/commit/6a6fc35a119c98ef6b17990b730ec2a0dc71485f))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([ccb7cc0](https://github.com/mindmorass/obsidian-confluence/commit/ccb7cc030be9816a4d61b67288fa70d948003e49))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([56496e9](https://github.com/mindmorass/obsidian-confluence/commit/56496e95459b0445b3a813f9343b064f56629ab9))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([69768b1](https://github.com/mindmorass/obsidian-confluence/commit/69768b1186d62b43be2db72ef270596e57c9cbd8))
* **deps:** bump puppeteer/puppeteer in /packages/cli ([07eeca7](https://github.com/mindmorass/obsidian-confluence/commit/07eeca733ab5104397afcbe620015da91b13dfff))
* **deps:** bump semver from 5.7.1 to 5.7.2 ([9feb1cc](https://github.com/mindmorass/obsidian-confluence/commit/9feb1cca67f9368864db5684acd67a9263373a07))
* **deps:** bump snyk/actions ([27a13fa](https://github.com/mindmorass/obsidian-confluence/commit/27a13faa9984be8e0bb047ba92500815ca27759b))
* **deps:** bump step-security/harden-runner from 2.3.1 to 2.4.0 ([4cd8c72](https://github.com/mindmorass/obsidian-confluence/commit/4cd8c7253efc3afbf70495c67eacc3d0bd08cb27))
* **deps:** bump step-security/harden-runner from 2.4.0 to 2.4.1 ([5e17ce0](https://github.com/mindmorass/obsidian-confluence/commit/5e17ce01b31d54ed458af215b5f76adb12ba503f))
* **deps:** bump step-security/harden-runner from 2.4.1 to 2.5.0 ([14bcdc4](https://github.com/mindmorass/obsidian-confluence/commit/14bcdc43df3ebdfc4dc2b251d914469f733524eb))
* **deps:** bump step-security/harden-runner from 2.5.0 to 2.5.1 ([e606cd4](https://github.com/mindmorass/obsidian-confluence/commit/e606cd42f3ae0032f274ba4ac669004878eeba57))
* **deps:** bump word-wrap from 1.2.3 to 1.2.4 ([1d4ba76](https://github.com/mindmorass/obsidian-confluence/commit/1d4ba769d3b9b15fdbdaabceb6ad6239e1ec3a3c))
* **deps:** bump yargs from 17.7.1 to 17.7.2 ([a91eabd](https://github.com/mindmorass/obsidian-confluence/commit/a91eabda6a6dab803b7eeab3b98d0457e4aef873))
* Remove unused deps ([2bfd5c4](https://github.com/mindmorass/obsidian-confluence/commit/2bfd5c4741202f4d18639254758ac9f914ec8eab))
* Update lint-staged to resolve vuln ([4ba7926](https://github.com/mindmorass/obsidian-confluence/commit/4ba7926a1d8a8a3334eeabafcf6dac43ed39c37d))
* Update package-lock.json ([52ba4fe](https://github.com/mindmorass/obsidian-confluence/commit/52ba4fe09edf8c978e973fa4f3c74d01ea9b35a5))


### Documentation

* Add badges to README.md ([53d2bf3](https://github.com/mindmorass/obsidian-confluence/commit/53d2bf330d341ed13296784339d1e7849cf9fe39))
* Add BRAT installation instructions ([a46cd23](https://github.com/mindmorass/obsidian-confluence/commit/a46cd23023426153405aef6e9d7c413a9c4bda01))
* Add brat to readme.md ([9d8efb0](https://github.com/mindmorass/obsidian-confluence/commit/9d8efb076b3dc43c787c684456559f8347c71c66))
* Add Conventional Commits ([f7b0696](https://github.com/mindmorass/obsidian-confluence/commit/f7b0696e2437c299a6cda22475212654a83b8e73))
* Add Discord link ([9c093f6](https://github.com/mindmorass/obsidian-confluence/commit/9c093f67c523a677c34c6e99d79be799b2c9e46f))
* Add Installation BRAT to side nav ([5d87192](https://github.com/mindmorass/obsidian-confluence/commit/5d871924fa93eceffc8be6817c61b42f70f9404f))
* Add link direct to Report a vuln ([61ce80a](https://github.com/mindmorass/obsidian-confluence/commit/61ce80a43356d5353b8a7705bd5bc6f026abc79d))
* Add note about logging issues to mono repo ([19992f6](https://github.com/mindmorass/obsidian-confluence/commit/19992f6705e0882025a1f8100b4ef42903df71e8))
* Add README.md files to all NPM Packages ([75c4781](https://github.com/mindmorass/obsidian-confluence/commit/75c47816b7895fd26d50382c316f83d6993cc56c))
* Add reference to https://github.com/LostPaul/obsidian-folder-notes/tree/main ([d783f1b](https://github.com/mindmorass/obsidian-confluence/commit/d783f1b0b60f0864f07bac7a8eaeeafbac7e6101))
* Add Snyk badge ([15f8382](https://github.com/mindmorass/obsidian-confluence/commit/15f8382e62c5bbfaccf51afc30ba76d3f5c1e758))
* add verification report for all changes ([17e1618](https://github.com/mindmorass/obsidian-confluence/commit/17e16187e7a7e1b7593d86ff911438986b81fd67))
* Add Wikilinks example ([92a979f](https://github.com/mindmorass/obsidian-confluence/commit/92a979ffd496e1993d36be26422bf341c0a58b72))
* amended the broken readme image paths for obsidian package ([97876cf](https://github.com/mindmorass/obsidian-confluence/commit/97876cf7c55e3ac4de89d85a70dfd4ba4e8b3f15))
* Docs moved to https://github.com/markdown-confluence/docs-obsidian-confluence ([442d353](https://github.com/mindmorass/obsidian-confluence/commit/442d3534b63c538c5a9ab2e8ab1a82e81717995d))
* Fix book.toml ([985561a](https://github.com/mindmorass/obsidian-confluence/commit/985561a25f9a801f6570c368941792fb24abfc64))
* Fix docs when they are published to obsidian-integration repo ([bb5887b](https://github.com/mindmorass/obsidian-confluence/commit/bb5887b96fcd27678c52552576defd0fda8dcf19))
* Fix links on Thanks page ([96c4953](https://github.com/mindmorass/obsidian-confluence/commit/96c4953f0251595ff17ec92f950bded255b0b0a1))
* Fix OpenSSF Scorecard Link ([16ca266](https://github.com/mindmorass/obsidian-confluence/commit/16ca266abacc64dbb3eb33c716dcf33f1a65d4d1))
* Minor documentation changes from jvsteiner ([f2d3b47](https://github.com/mindmorass/obsidian-confluence/commit/f2d3b474474d80bd05ff589a3654e4400e05265d))
* Update Obsidian docs to remove need for BRAT install ([9fc8fc8](https://github.com/mindmorass/obsidian-confluence/commit/9fc8fc8236c369b53c3d5bdcc63777525f30a0c9))
* Update repo and org names to match new names ([404a85b](https://github.com/mindmorass/obsidian-confluence/commit/404a85b206704873d57c233131ba4f564c4ccd86))


### Miscellaneous Chores

* release 3.0.0 ([cc12c74](https://github.com/mindmorass/obsidian-confluence/commit/cc12c74227dd7f6f0ed2d52b5120d7b727aa37a1))
</details>

---
This PR was generated with [Release Please](https://github.com/googleapis/release-please). See [documentation](https://github.com/googleapis/release-please#release-please).