const builder = require('@ckeditor/ckeditor5-builder');

builder.createEditorConfig({
  plugins: [SourceEditing, Toolbar]
}).then(editorConfig => {
  module.exports = editorConfig;
});