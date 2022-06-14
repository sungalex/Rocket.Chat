export class ImporterInfo {
	key: string;

	name: string;

	mimeType: string;

	warnings: Array<{ href: string; text: string }>;

	importer: any;

	instance: any;

	/**
	 * Creates a new class which contains information about the importer.
	 */
	constructor(key: string, name = '', mimeType = '', warnings = []) {
		this.key = key;
		this.name = name;
		this.mimeType = mimeType;
		this.warnings = warnings;

		this.importer = undefined;
		this.instance = undefined;
	}
}
