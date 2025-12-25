import { Modal, App } from "obsidian";
import ReactDOM from "react-dom";
import React, { useState } from "react";
import { UploadAdfFileResult } from "@markdown-confluence/lib";

export interface FailedFile {
  fileName: string;
  reason: string;
}

export interface UploadResults {
  errorMessage: string | null;
  failedFiles: FailedFile[];
  filesUploadResult: UploadAdfFileResult[];
}

export interface UploadResultsProps {
  uploadResults: UploadResults;
}

const CompletedView: React.FC<UploadResultsProps> = ({ uploadResults }) => {
  // Defensive checks - ensure we always have valid data
  if (!uploadResults) {
    return (
      <div className="upload-results">
        <h1>Confluence Publish</h1>
        <p>No upload results available.</p>
      </div>
    );
  }

  const { errorMessage, failedFiles, filesUploadResult } = uploadResults;
  const [expanded, setExpanded] = useState(false);

  const countResults = {
    content: { same: 0, updated: 0 },
    images: { same: 0, updated: 0 },
    labels: { same: 0, updated: 0 },
  };

  const safeFilesUploadResult = filesUploadResult || [];
  const safeFailedFiles = failedFiles || [];

  if (Array.isArray(safeFilesUploadResult)) {
    safeFilesUploadResult.forEach((result) => {
      if (result) {
        if (result.contentResult) {
          countResults.content[result.contentResult as "same" | "updated"]++;
        }
        if (result.imageResult) {
          countResults.images[result.imageResult as "same" | "updated"]++;
        }
        if (result.labelResult) {
          countResults.labels[result.labelResult as "same" | "updated"]++;
        }
      }
    });
  }

  const renderUpdatedFiles = (type: "content" | "image" | "label") => {
    return safeFilesUploadResult
      .filter((result: UploadAdfFileResult) => result && result[`${type}Result`] === "updated")
      .map((result: UploadAdfFileResult, index: number) => (
        <li key={index}>
          <a href={result.adfFile?.pageUrl || "#"}>
            {result.adfFile?.absoluteFilePath || "Unknown file"}
          </a>
        </li>
      ));
  };

  return (
    <div className="upload-results">
      <div>
        <h1>Confluence Publish</h1>
      </div>
      {errorMessage ? (
        <div className="error-message">
          <h3>Error</h3>
          <p>{errorMessage}</p>
        </div>
      ) : (
        <>
          <div className="successful-uploads">
            <h3>Successful Uploads</h3>
            <p>{safeFilesUploadResult.length} file(s) uploaded successfully.</p>
          </div>

          {safeFailedFiles.length > 0 && (
            <div className="failed-uploads">
              <h3>Failed Uploads</h3>
              <p>{safeFailedFiles.length} file(s) failed to upload.</p>
              <ul>
                {safeFailedFiles.map((file: FailedFile, index: number) => (
                  <li key={index}>
                    <strong>{file.fileName || "Unknown"}</strong>: {file.reason || "Unknown error"}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <table className="result-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Same</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Content</td>
                <td>{countResults.content.same}</td>
                <td>{countResults.content.updated}</td>
              </tr>
              <tr>
                <td>Images</td>
                <td>{countResults.images.same}</td>
                <td>{countResults.images.updated}</td>
              </tr>
              <tr>
                <td>Labels</td>
                <td>{countResults.labels.same}</td>
                <td>{countResults.labels.updated}</td>
              </tr>
            </tbody>
          </table>
          <div className="expandable-section">
            <button onClick={() => setExpanded(!expanded)}>
              {expanded ? "Collapse" : "Expand"} Updated Files
            </button>
            {expanded && (
              <div className="updated-files">
                <div className="updated-content">
                  <h4>Updated Content</h4>
                  <ul>{renderUpdatedFiles("content")}</ul>
                </div>
                <div className="updated-images">
                  <h4>Updated Images</h4>
                  <ul>{renderUpdatedFiles("image")}</ul>
                </div>
                <div className="updated-labels">
                  <h4>Updated Labels</h4>
                  <ul>{renderUpdatedFiles("label")}</ul>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export class CompletedModal extends Modal {
  uploadResults: UploadResultsProps;

  constructor(app: App, uploadResults: UploadResultsProps) {
    super(app);
    this.uploadResults = uploadResults;
  }

  override onOpen() {
    const { contentEl } = this;
    // Clear any existing content
    contentEl.empty();
    
    // Use ReactDOM.render (consistent with ConfluencePerPageForm)
    // React 18 createRoot may not work correctly in Obsidian's environment
    try {
      ReactDOM.render(
        React.createElement(CompletedView, this.uploadResults),
        contentEl,
      );
    } catch (error) {
      console.error("Failed to render CompletedModal:", error);
      // Fallback: show error message directly in the modal
      contentEl.createEl("h2", { text: "Confluence Publish" });
      contentEl.createEl("p", {
        text: `Error rendering upload results: ${error instanceof Error ? error.message : String(error)}`,
      });
      if (this.uploadResults.uploadResults.errorMessage) {
        contentEl.createEl("p", {
          text: `Error: ${this.uploadResults.uploadResults.errorMessage}`,
        });
      }
    }
  }

  override onClose() {
    const { contentEl } = this;
    ReactDOM.unmountComponentAtNode(contentEl);
    contentEl.empty();
  }
}
