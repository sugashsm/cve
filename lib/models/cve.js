import mongoose from 'mongoose';

const CveSchema = new mongoose.Schema({
  cveId: { type: String, unique: true, required: true }, // Unique identifier for the CVE
  identifier: { type: String },                         // Source identifier
  description: { type: String, default: 'No description available' }, // Vulnerability description
  publishedDate: { type: Date },                        // Date of publication
  lastModifiedDate: { type: Date },                    // Date of last modification
  baseScore: { type: Number, default: null },          // CVSS v2 base score
  vectorString: { type: String, default: null },       // CVSS vector string
  accessVector: { type: String, default: null },       // Access vector
  accessComplexity: { type: String, default: null },   // Access complexity
  authentication: { type: String, default: null },     // Authentication requirements
  confidentialityImpact: { type: String, default: null }, // Confidentiality impact
  integrityImpact: { type: String, default: null },    // Integrity impact
  availabilityImpact: { type: String, default: null }, // Availability impact
  exploitabilityScore: { type: Number, default: null }, // Exploitability score
  impactScore: { type: Number, default: null },        // Impact score
  vulnerable: { type: Boolean, default: null },        // Vulnerability flag
  criteria: { type: String, default: null },           // Match criteria
  matchCriteria: { type: String, default: null },      // Match criteria ID
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

export default mongoose.models.Cve || mongoose.model('Cve', CveSchema);
