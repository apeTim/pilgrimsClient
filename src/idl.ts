export type Awake = {
  "version": "0.1.0",
  "name": "awake",
  "instructions": [
    {
      "name": "awake",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "updateAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pilgrim",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pilgrimMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pilgrimAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "book",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bookMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bookAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "scroll",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "scrollMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "scrollAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "types": [
    {
      "name": "AwakeErrors",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "PilgrimAlreadyAwaken"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "WrongMetadataAccount",
      "msg": "Wrong metadata account"
    },
    {
      "code": 6001,
      "name": "WrongCollection",
      "msg": "Wrong collection"
    },
    {
      "code": 6002,
      "name": "NoAllowedCreator",
      "msg": "No allowed creator"
    },
    {
      "code": 6003,
      "name": "WrongTraitData",
      "msg": "Wrong trait data"
    }
  ]
};

export const IDL: Awake = {
  "version": "0.1.0",
  "name": "awake",
  "instructions": [
    {
      "name": "awake",
      "accounts": [
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "updateAuthority",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "pilgrim",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pilgrimMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "pilgrimAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "book",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bookMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "bookAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "scroll",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "scrollMetadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "scrollAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMintAta",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "types": [
    {
      "name": "AwakeErrors",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "PilgrimAlreadyAwaken"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "WrongMetadataAccount",
      "msg": "Wrong metadata account"
    },
    {
      "code": 6001,
      "name": "WrongCollection",
      "msg": "Wrong collection"
    },
    {
      "code": 6002,
      "name": "NoAllowedCreator",
      "msg": "No allowed creator"
    },
    {
      "code": 6003,
      "name": "WrongTraitData",
      "msg": "Wrong trait data"
    }
  ]
};
