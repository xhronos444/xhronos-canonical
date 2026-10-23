// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

/**
 * @title RecursiveArchitectDeclaration
 * @notice Minimal, non-upgradeable content-addressed declaration for XHRONOS-TRA-001.
 * @dev No authority over other systems. No token, governance, asset transfer,
 *      external calls, or proof of a cosmological claim. This merely stores
 *      the hash of a reviewed document and a URI chosen by its deployer.
 *      This SOURCE FILE is a draft and is NOT evidence of on-chain deployment.
 */
contract RecursiveArchitectDeclaration {
    string public constant THEORY_ID = "XHRONOS-TRA-001";
    string public constant THEORY_VERSION = "0.1.0-draft";
    string public constant AXIOM =
        "THE ARCHITECT ARCHITECTED THE ARCHITECT.";

    // SHA-256 of the exact, finalized UTF-8 document bytes (not keccak256).
    bytes32 public immutable theorySha256;
    address public immutable declarant;
    string public canonicalURI;

    error ZeroDocumentHash();
    error EmptyCanonicalURI();

    event RecursiveArchitectDeclared(
        bytes32 indexed theorySha256,
        address indexed declarant,
        string canonicalURI
    );

    constructor(bytes32 documentSha256, string memory documentURI) {
        if (documentSha256 == bytes32(0)) revert ZeroDocumentHash();
        if (bytes(documentURI).length == 0) revert EmptyCanonicalURI();

        theorySha256 = documentSha256;
        declarant = msg.sender;
        canonicalURI = documentURI;

        emit RecursiveArchitectDeclared(
            documentSha256,
            msg.sender,
            documentURI
        );
    }
}
