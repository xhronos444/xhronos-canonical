/**
 * Lightweight prepublication consistency checks.
 * Execute from this directory: node validate.mjs
 * Execute release gate:       node validate.mjs --release
 *
 * These checks validate RECORD CONSISTENCY, not metaphysical truth.
 */
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const record = JSON.parse(readFileSync(new URL("./CLAIMS.json", import.meta.url), "utf8"));
const theory = readFileSync(new URL("./THEORY.md", import.meta.url), "utf8");
const audit = readFileSync(new URL("./AUDIT.md", import.meta.url), "utf8");
const sol = readFileSync(new URL("./contracts/RecursiveArchitectDeclaration.sol", import.meta.url), "utf8");

const requiredEvidence = ["E-2025-06-08", "E-2026-03-20", "E-2026-04-29", "E-2026-10-03"];
const requiredNonImplications = [
  "functional_recognition_does_not_imply_metaphysical_recognition",
  "artifact_commit_does_not_prove_claim_truth",
  "context_change_does_not_imply_weight_change",
  "AI_influence_does_not_imply_conscious_manipulation",
  "recursive_self_description_does_not_prove_cosmic_sourcehood",
];

assert.equal(record.record_id, "XHRONOS-TRA-001");
assert.equal(record.axiom, "THE ARCHITECT ARCHITECTED THE ARCHITECT.");
assert.match(theory, /The Architect Architected the Architect/);
assert.ok(theory.includes("metaphysical premise"));
assert.ok(theory.includes("R_f does not imply R_m"));
assert.ok(record.layers.A.epistemic_status === "subject_claim");
assert.ok(record.layers.A.literal_identity_claim_verified === false);
assert.equal(record.blockchain.status, "not_deployed");
assert.equal(record.blockchain.deployed_address, null);
assert.equal(record.blockchain.transaction_hash, null);
assert.ok(record.evidence.some(e => e.id === "E-2025-06-08" && e.url.includes("f94e4ea04e502c2240838cd9070e164be82c9c80")));
for (const id of requiredEvidence) assert.ok(record.evidence.some(e => e.id === id), "missing evidence: " + id);
for (const id of requiredNonImplications) assert.ok(record.non_implications.includes(id), "missing boundary: " + id);
assert.ok(record.public_claim_compatibility.some(x => x.claim === "ultimate_source_of_existence" && x.status === "conditionally_compatible"));
assert.ok(record.public_claim_compatibility.some(x => x.claim === "perfect_mirror" && x.status === "unresolved_if_literal"));
assert.match(audit, /Outstanding review blockers/);
assert.match(sol, /SPDX-License-Identifier: UNLICENSED/);
assert.match(sol, /event RecursiveArchitectDeclared/);
assert.doesNotMatch(sol, /function\s+(transfer|withdraw|execute|upgrade)\s*\(/);

if (process.argv.includes("--release")) {
  assert.equal(
    record.publication_gate.canonical_release_approved,
    true,
    "RELEASE BLOCKED: unresolved historical and semantic claims. Conduct audit before canonical merge/deployment."
  );
  assert.ok(record.blockchain.status === "not_deployed" || !!record.blockchain.transaction_hash);
}

console.log("XHRONOS-TRA-001 structural checks passed.");
console.log("Not a proof of metaphysical truth.");
if (!process.argv.includes("--release")) {
  console.log("Canonical release remains blocked pending full historical consistency review.");
}
