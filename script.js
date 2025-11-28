let main = {

  initialState: {},
  variables: {
    turn: 'w',
    selectedpiece: '',
    highlighted: [],
    inCheck: '', // 'w' or 'b' if a king is in check
    gameOver: false,
    enPassantTarget: null,
    lastMove: {
      from: '',
      to: ''
    },
    pieces: {
      w_king: {
        position: '5_1',
        img: '&#9812;',
        captured: false,
        moved: false,
        type: 'w_king'
        
      },
      w_queen: {
        position: '4_1',
        img: '&#9813;',
        captured: false,
        moved: false,
        type: 'w_queen'
      },
      w_bishop1: {
        position: '3_1',
        img: '&#9815;',
        captured: false,
        moved: false,
        type: 'w_bishop'
      },
      w_bishop2: {
        position: '6_1',
        img: '&#9815;',
        captured: false,
        moved: false,
        type: 'w_bishop'
      },
      w_knight1: {
        position: '2_1',
        img: '&#9816;',
        captured: false,
        moved: false,
        type: 'w_knight'
      },
      w_knight2: {
        position: '7_1',
        img: '&#9816;',
        captured: false,
        moved: false,
        type: 'w_knight'
      },
      w_rook1: {
        position: '1_1',
        img: '&#9814;',
        captured: false,
        moved: false,
        type: 'w_rook'
      },
      w_rook2: {
        position: '8_1',
        img: '&#9814;',
        captured: false,
        moved: false,
        type: 'w_rook'
      },
      w_pawn1: {
        position: '1_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn2: {
        position: '2_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn3: {
        position: '3_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn4: {
        position: '4_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn5: {
        position: '5_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn6: {
        position: '6_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn7: {
        position: '7_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },
      w_pawn8: {
        position: '8_2',
        img: '&#9817;',
        captured: false,
        type: 'w_pawn',
        moved: false
      },

      b_king: {
        position: '5_8',
        img: '&#9818;',
        captured: false,
        moved: false,
        type: 'b_king'
      },
      b_queen: {
        position: '4_8',
        img: '&#9819;',
        captured: false,
        moved: false,
        type: 'b_queen'
      },
      b_bishop1: {
        position: '3_8',
        img: '&#9821;',
        captured: false,
        moved: false,
        type: 'b_bishop'
      },
      b_bishop2: {
        position: '6_8',
        img: '&#9821;',
        captured: false,
        moved: false,
        type: 'b_bishop'
      },
      b_knight1: {
        position: '2_8',
        img: '&#9822;',
        captured: false,
        moved: false,
        type: 'b_knight'
      },
      b_knight2: {
        position: '7_8',
        img: '&#9822;',
        captured: false,
        moved: false,
        type: 'b_knight'
      },
      b_rook1: {
        position: '1_8',
        img: '&#9820;',
        captured: false,
        moved: false,
        type: 'b_rook'
      },
      b_rook2: {
        position: '8_8',
        img: '&#9820;',
        captured: false,
        moved: false,
        type: 'b_rook'
      },
      b_pawn1: {
        position: '1_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn2: {
        position: '2_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn3: {
        position: '3_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn4: {
        position: '4_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn5: {
        position: '5_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn6: {
        position: '6_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn7: {
        position: '7_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      },
      b_pawn8: {
        position: '8_7',
        img: '&#9823;',
        captured: false,
        type: 'b_pawn',
        moved: false
      }

    }
  },

  methods: {
    resetGame: function() {
      // Restore variables from the initial state
      main.variables = JSON.parse(JSON.stringify(main.initialState));
      
      // Also reset enPassantTarget from initial state
      main.variables.enPassantTarget = null;

      // Hide game over modal
      $('#game-over-modal').hide();

      // Clear any active highlights
      $('.gamecell').removeClass("green shake-little neongreen_txt last-move-from last-move-to in-check");

      // Clear the board UI
      $('.gamecell').html('').attr('chess', 'null');

      // Clear captured pieces display
      $('#captured-by-white').empty();
      $('#captured-by-black').empty();

      // Redraw pieces in their starting positions
      main.methods.gamesetup();

      // Reset turn indicator
      $('#turn').html("It's Whites Turn!");

      console.log("Game has been reset.");
    },

    drawboard: function() {
      const board = $('#game');
      const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  
      board.empty(); 
  
      for (let rank = 8; rank >= 1; rank--) {
          board.append(`<div class='cellprefix'>${rank}</div>`);
  
          for (let file = 1; file <= 8; file++) {
              const isGrey = (rank + file) % 2 === 1;
              const cellId = `${file}_${rank}`;
              board.append(`<div class='gamecell ${isGrey ? 'grey' : ''}' id='${cellId}'></div>`);
          }
      }
  
      board.append(`<div class='cellprefix'></div>`); // Empty corner
      for (const file of files) {
          board.append(`<div class='cellprefix'>${file}</div>`);
      }
    },

    gamesetup: function() {
      $('.gamecell').attr('chess', 'null');
      for (let gamepiece in main.variables.pieces) {
        $('#' + main.variables.pieces[gamepiece].position).html(main.variables.pieces[gamepiece].img);
        $('#' + main.variables.pieces[gamepiece].position).attr('chess', gamepiece);
      }
    },

    testMove: function(pieceName, toId) {
      const pieceToMove = main.variables.pieces[pieceName];
      const fromId = pieceToMove.position;
      const targetPieceName = $('#' + toId).attr('chess');
      const targetPiece = (targetPieceName !== 'null') ? main.variables.pieces[targetPieceName] : null;

      // Store original states
      const originalPosition = pieceToMove.position;
      const wasTargetCaptured = targetPiece ? targetPiece.captured : null;

      // Perform the virtual move
      pieceToMove.position = toId;
      if (targetPiece) {
        targetPiece.captured = true;
      }
      // Update DOM attributes for the check
      $('#' + fromId).attr('chess', 'null');
      $('#' + toId).attr('chess', pieceName);

      // Return a function to undo the virtual move
      return function undo() {
        pieceToMove.position = originalPosition;
        if (targetPiece) {
          targetPiece.captured = wasTargetCaptured;
        }
        $('#' + fromId).attr('chess', pieceName);
        $('#' + toId).attr('chess', targetPieceName);
      };
    },

    moveoptions: function(selectedpieceName) {
      if (main.variables.highlighted.length != 0) {
        main.methods.togglehighlight(main.variables.highlighted);
      }
      const piece = main.variables.pieces[selectedpieceName];
      const moves = main.methods.generateMoves(piece);
      const legalMoves = main.methods.filterIllegalMoves(selectedpieceName, moves);

      main.variables.highlighted = legalMoves.slice(0);
      main.methods.togglehighlight(main.variables.highlighted);
    },

    generateMoves: function(piece) {
      const [x, y] = piece.position.split('_').map(Number);
      const color = piece.type.slice(0, 1);
      const pieceType = piece.type.split('_')[1];
      let moves = [];

      const movePatterns = {
        rook:   [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}],
        bishop: [{x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: -1, y: -1}],
        queen:  [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: -1, y: -1}],
        king:   [{x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 1}, {x: 1, y: -1}, {x: -1, y: 1}, {x: -1, y: -1}],
        knight: [{x: 1, y: 2}, {x: 1, y: -2}, {x: -1, y: 2}, {x: -1, y: -2}, {x: 2, y: 1}, {x: 2, y: -1}, {x: -2, y: 1}, {x: -2, y: -1}]
      };

      if (['rook', 'bishop', 'queen'].includes(pieceType)) {
        moves = main.methods.getSlidingMoves({x, y}, movePatterns[pieceType], color);
      } else if (['king', 'knight'].includes(pieceType)) {
        const opponentColor = color === 'w' ? 'b' : 'w';
        movePatterns[pieceType].forEach(move => {
          const newX = x + move.x;
          const newY = y + move.y;
          if (newX >= 1 && newX <= 8 && newY >= 1 && newY <= 8) {
            const targetId = `${newX}_${newY}`;
            const targetPiece = $('#' + targetId).attr('chess');
            if (targetPiece === 'null' || targetPiece.startsWith(opponentColor)) {
              moves.push(targetId);
            }
          }
        });
      } else if (pieceType === 'pawn') {
        const dir = color === 'w' ? 1 : -1;
        const opponentColor = color === 'w' ? 'b' : 'w';

        // Forward 1
        const oneForward = `${x}_${y + dir}`;
        if ($('#' + oneForward).attr('chess') === 'null') {
          moves.push(oneForward);
          // Forward 2 (initial move)
          if (!piece.moved) {
            const twoForward = `${x}_${y + 2 * dir}`;
            if ($('#' + twoForward).attr('chess') === 'null') {
              moves.push(twoForward);
            }
          }
        }
        // Captures
        [-1, 1].forEach(dx => {
          const captureX = x + dx;
          const captureY = y + dir;
          if (captureX >= 1 && captureX <= 8) {
            const captureId = `${captureX}_${captureY}`;
            const targetPiece = $('#' + captureId).attr('chess');
            if (targetPiece && targetPiece.startsWith(opponentColor)) {
              moves.push(captureId);
            }
            // En Passant capture
            if (main.variables.enPassantTarget === captureId) {
              moves.push(captureId);
            }
          }
        });
      }

      // Castling logic (special case for king)
      if (pieceType === 'king' && !piece.moved) {
        // Kingside
        if ($(`#${x+1}_${y}`).attr('chess') === 'null' && $(`#${x+2}_${y}`).attr('chess') === 'null') {
          const rook = main.variables.pieces[`${color}_rook2`];
          if (rook && !rook.moved) {
            moves.push(`${x+2}_${y}`);
          }
        }
        // Queenside (not implemented in original, but could be added here)
      }

      return moves;
    },
    
    filterIllegalMoves: function(pieceName, options) {
      const playerColor = pieceName.slice(0, 1);
      const opponentColor = playerColor === 'w' ? 'b' : 'w';

      return options.filter(move => {
        const undo = main.methods.testMove(pieceName, move);
        const kingPosition = main.methods.findKing(playerColor);
        const isKingInCheck = main.methods.isSquareAttacked(kingPosition, opponentColor);
        
        undo(); // Revert the virtual move

        return !isKingInCheck;
      });
    },

    getSlidingMoves: function(position, directions, color) {
      const moves = [];
      const opponentColor = color === 'w' ? 'b' : 'w';
      for (const dir of directions) {
        for (let i = 1; i < 8; i++) {
          const newX = position.x + dir.x * i;
          const newY = position.y + dir.y * i;
          if (newX < 1 || newX > 8 || newY < 1 || newY > 8) break;
          const newPosId = `${newX}_${newY}`;
          const targetPiece = $('#' + newPosId).attr('chess');
          if (targetPiece === 'null') {
            moves.push(newPosId);
          } else {
            if (targetPiece.startsWith(opponentColor)) moves.push(newPosId);
            break;
          }
        }
      }
      return moves;
    },

    updateLastMoveHighlight: function(fromId, toId) {
      // Remove previous highlight
      if (main.variables.lastMove.from) {
        $('#' + main.variables.lastMove.from).removeClass('last-move-from');
        $('#' + main.variables.lastMove.to).removeClass('last-move-to');
      }
      // Add new highlight
      $('#' + fromId).addClass('last-move-from');
      $('#' + toId).addClass('last-move-to');
      // Store new last move
      main.variables.lastMove = { from: fromId, to: toId };
    },

    capture: function (target) {
      // Handle En Passant capture
      if (main.variables.enPassantTarget === target.id) {
        const color = main.variables.turn;
        const dir = color === 'w' ? -1 : 1;
        const targetPawnPos = `${target.id.split('_')[0]}_${parseInt(target.id.split('_')[1]) + dir}`;
        const capturedPawnName = $('#' + targetPawnPos).attr('chess');

        // Manually set the target piece for capture logic
        target.name = capturedPawnName;

        // Remove the captured pawn from the board
        $('#' + targetPawnPos).html('');
        $('#' + targetPawnPos).attr('chess', 'null');
      }

      const sound = $('#capture-sound')[0];
      sound.currentTime = 0;
      sound.play();

      let selectedpiece = {
        name: $('#' + main.variables.selectedpiece).attr('chess'),
        id: main.variables.selectedpiece
      };

      
        // Highlight the move
        main.methods.updateLastMoveHighlight(selectedpiece.id, target.id);
        //new cell
        $('#' + target.id).html(main.variables.pieces[selectedpiece.name].img);
        $('#' + target.id).attr('chess',selectedpiece.name);
        //old cell
        $('#' + selectedpiece.id).html('');
        $('#' + selectedpiece.id).attr('chess','null');
        //moved piece
        main.variables.pieces[selectedpiece.name].position = target.id;
        main.variables.pieces[selectedpiece.name].moved = true;
        // captured piece
        main.variables.pieces[target.name].captured = true;

        // Add captured piece to the display
        const capturedPiece = main.variables.pieces[target.name];
        if (capturedPiece.type.startsWith('w_')) {
          $('#captured-by-black').append(`<span>${capturedPiece.img}</span>`);
        } else {
          $('#captured-by-white').append(`<span>${capturedPiece.img}</span>`);
        }
        /*
        // toggle highlighted coordinates
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;
        // set the selected piece to '' again
        main.variables.selectedpiece = '';
        */
      
    },

    move: function (target) {
      const sound = $('#move-sound')[0];
      sound.currentTime = 0;
      sound.play();

      let selectedpiece = $('#' + main.variables.selectedpiece).attr('chess');

      // Highlight the move
      main.methods.updateLastMoveHighlight(main.variables.selectedpiece, target.id);

      // new cell
      $('#' + target.id).html(main.variables.pieces[selectedpiece].img);
      $('#' + target.id).attr('chess',selectedpiece);
      // old cell
      $('#' + main.variables.selectedpiece).html('');
      $('#' + main.variables.selectedpiece).attr('chess','null');

      // Set en passant target if a pawn moves two squares
      const piece = main.variables.pieces[selectedpiece];
      if (piece.type.includes('pawn') && Math.abs(target.id.split('_')[1] - piece.position.split('_')[1]) === 2) {
        const dir = piece.type.startsWith('w') ? -1 : 1;
        main.variables.enPassantTarget = `${target.id.split('_')[0]}_${parseInt(target.id.split('_')[1]) + dir}`;
      } else {
        main.variables.enPassantTarget = null;
      }

      main.variables.pieces[selectedpiece].position = target.id;
      main.variables.pieces[selectedpiece].moved = true;

      /*
      // toggle highlighted coordinates
      main.methods.togglehighlight(main.variables.highlighted);
      main.variables.highlighted.length = 0;
      // set the selected piece to '' again
      main.variables.selectedpiece = '';
      */
    },

    promptPromotion: function(pawnName, positionId) {
      const color = pawnName.slice(0, 1);
      const promotionPieces = {
        w: { queen: '&#9813;', rook: '&#9814;', bishop: '&#9815;', knight: '&#9816;' },
        b: { queen: '&#9819;', rook: '&#9820;', bishop: '&#9821;', knight: '&#9822;' }
      };

      const $promotionButtons = $('#promotion-buttons');
      $promotionButtons.empty();

      for (const pieceType in promotionPieces[color]) {
        const pieceImg = promotionPieces[color][pieceType];
        $promotionButtons.append(`<button data-type="${color}_${pieceType}">${pieceImg}</button>`);
      }

      $('#promotion-choice').css('display', 'flex');

      $('#promotion-buttons button').off('click').on('click', function() {
        const newType = $(this).data('type');
        const newImg = $(this).html();

        // Update the piece object
        main.variables.pieces[pawnName].type = newType;
        main.variables.pieces[pawnName].img = newImg;

        // Update the board
        $('#' + positionId).html(newImg);

        // Hide the modal
        $('#promotion-choice').hide();

        // Now end the turn
        main.methods.endturn();
      });
    },

    isPawnPromotion: function(pieceName, targetPosition) {
      const piece = main.variables.pieces[pieceName];
      const rank = parseInt(targetPosition.split('_')[1]);
      return (piece.type.includes('pawn') && ((piece.type.startsWith('w_') && rank === 8) || (piece.type.startsWith('b_') && rank === 1)));
    },

    getPieceAt: function(positionId) {
      const pieceName = $('#' + positionId).attr('chess');
      if (pieceName && pieceName !== 'null') {
        return main.variables.pieces[pieceName];
      }
      return null;
    },

    findKing: function(color) {
      const kingName = color + '_king';
      return main.variables.pieces[kingName].position;
    },

    updateCheckStatus: function() {
      const opponentColor = main.variables.turn; // The player whose turn it is now
      const kingColor = opponentColor === 'w' ? 'b' : 'w';
      const kingPosition = main.methods.findKing(kingColor);

      // Clear previous check highlight
      if (main.variables.inCheck) {
        const oldKingPos = main.methods.findKing(main.variables.inCheck);
        $('#' + oldKingPos).removeClass('in-check');
        main.variables.inCheck = '';
      }

      if (main.methods.isSquareAttacked(kingPosition, opponentColor)) {
        main.variables.inCheck = kingColor;
        $('#' + kingPosition).addClass('in-check');
        
        // Check for Checkmate
        if (main.methods.checkForMate(kingColor)) {
          main.variables.gameOver = true;
          const winner = opponentColor === 'w' ? 'White' : 'Black';
          $('#game-over-message').text(`Checkmate! ${winner} wins!`);
          $('#game-over-modal').css('display', 'flex');
        } else {
          console.log(kingColor.toUpperCase() + " is in check!");
        }
      } else {
        // Not in check, so check for STALEMATE
        // Note: kingColor here is the player whose turn it is about to be.
        if (main.methods.checkForMate(kingColor)) {
          main.variables.gameOver = true;
          $('#game-over-message').text(`Stalemate! It's a draw!`);
          $('#game-over-modal').css('display', 'flex');
        }
      }
    },

    checkForMate: function(kingColor) {
      // Check if the player (kingColor) has any legal moves.
      for (const pieceName in main.variables.pieces) {
        if (pieceName.startsWith(kingColor) && !main.variables.pieces[pieceName].captured) {
          // We need to generate the options without highlighting them on the board.
          // A bit of a hack: temporarily disable togglehighlight
          const originalToggleHighlight = main.methods.togglehighlight;
          main.methods.togglehighlight = () => {}; // Do nothing
          main.methods.moveoptions(pieceName);
          main.methods.togglehighlight = originalToggleHighlight; // Restore it

          if (main.variables.highlighted.length > 0) {
            main.variables.highlighted = []; // Clean up
            return false; // Found a legal move, so it's not checkmate.
          }
        }
      }
      return true; // No legal moves found for any piece. It's checkmate.
    },

    isSquareAttacked: function(positionId, attackingColor) {
      // This is a complex function that checks if any piece of attackingColor can attack positionId
      // It needs to generate all possible moves for the attacking side and see if positionId is among them.

      for (const pieceName in main.variables.pieces) {
        const piece = main.variables.pieces[pieceName];
        if (piece.captured || !pieceName.startsWith(attackingColor)) {
          continue;
        }

        const fromPos = piece.position.split('_').map(Number);
        const toPos = positionId.split('_').map(Number);
        const dx = toPos[0] - fromPos[0];
        const dy = toPos[1] - fromPos[1];

        switch (piece.type.split('_')[1]) {
          case 'pawn':
            if (attackingColor === 'w') {
              if (dy === 1 && Math.abs(dx) === 1) return true;
            } else { // black pawn
              if (dy === -1 && Math.abs(dx) === 1) return true;
            }
            break;
          case 'knight':
            if ((Math.abs(dx) === 1 && Math.abs(dy) === 2) || (Math.abs(dx) === 2 && Math.abs(dy) === 1)) {
              return true;
            }
            break;
          case 'king':
            if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
              return true;
            }
            break;
          case 'bishop':
          case 'queen': // Queen includes bishop moves
            if (Math.abs(dx) === Math.abs(dy)) {
              // Check for obstructions
              let pathIsClear = true;
              let stepX = Math.sign(dx);
              let stepY = Math.sign(dy);
              for (let i = 1; i < Math.abs(dx); i++) {
                let intermediatePos = `${fromPos[0] + i * stepX}_${fromPos[1] + i * stepY}`;
                if (main.methods.getPieceAt(intermediatePos)) {
                  pathIsClear = false;
                  break;
                }
              }
              if (pathIsClear) return true;
            }
            if (piece.type.split('_')[1] !== 'queen') break; // fallthrough for queen
          case 'rook': // Queen includes rook moves
            if (dx === 0 || dy === 0) {
              // Check for obstructions
              let pathIsClear = true;
              if (dx === 0) { // Vertical
                let stepY = Math.sign(dy);
                for (let i = 1; i < Math.abs(dy); i++) {
                  let intermediatePos = `${fromPos[0]}_${fromPos[1] + i * stepY}`;
                  if (main.methods.getPieceAt(intermediatePos)) {
                    pathIsClear = false;
                    break;
                  }
                }
              } else { // Horizontal
                let stepX = Math.sign(dx);
                for (let i = 1; i < Math.abs(dx); i++) {
                  let intermediatePos = `${fromPos[0] + i * stepX}_${fromPos[1]}`;
                  if (main.methods.getPieceAt(intermediatePos)) {
                    pathIsClear = false;
                    break;
                  }
                }
              }
              if (pathIsClear) return true;
            }
            break;
        }
      }
      return false;
    },

    endturn: function(){

      // Clear en passant vulnerability at the end of the turn
      // Note: This is cleared by the next move logic, but as a safeguard:
      // main.variables.enPassantTarget = null;

      if (main.variables.turn == 'w') {
        main.variables.turn = 'b';
        
        // toggle highlighted coordinates
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;
        // set the selected piece to '' again
        main.variables.selectedpiece = '';

        $('#turn').html("It's Blacks Turn");

        $('#turn').addClass('turnhighlight');
        window.setTimeout(function(){
          $('#turn').removeClass('turnhighlight');
        }, 1500);

      } else if (main.variables.turn == 'b'){
        main.variables.turn = 'w';

        // toggle highlighted coordinates
        main.methods.togglehighlight(main.variables.highlighted);
        main.variables.highlighted.length = 0;
        // set the selected piece to '' again
        main.variables.selectedpiece = '';

        $('#turn').html("It's Whites Turn");

        $('#turn').addClass('turnhighlight');
        window.setTimeout(function(){
          $('#turn').removeClass('turnhighlight');
        }, 1500);

      }

      main.methods.updateCheckStatus();

    },

    togglehighlight: function(options) {
      options.forEach(function(element, index, array) {
        $('#' + element).toggleClass("green shake-little neongreen_txt");
      });
    },

  }
};

$(document).ready(function() {
  // Store a deep copy of the initial state for resetting
  main.initialState = JSON.parse(JSON.stringify(main.variables));

  main.methods.drawboard();
  main.methods.gamesetup();

  // Theme switcher
  $('#theme-select').on('change', function() {
    const theme = $(this).val();
    $('body').removeClass('theme-default theme-classic theme-ocean theme-forest').addClass('theme-' + theme);
  });

  $('.gamecell').click(function(e) {

    if (main.variables.gameOver) return; // Don't allow moves if game is over

    // New Game button handler
    $('#new-game-btn').click(main.methods.resetGame);

    var selectedpiece = {
      name: '',
      id: main.variables.selectedpiece
    };

    if (main.variables.selectedpiece == ''){
      selectedpiece.name = $('#' + e.target.id).attr('chess');
    } else {
      selectedpiece.name = $('#' + main.variables.selectedpiece).attr('chess');
    }

    var target = {
      name: $(this).attr('chess'),
      id: e.target.id
    };

    if (main.variables.selectedpiece == '' && target.name.slice(0,1) == main.variables.turn) { // show options

      // moveoptions
      main.variables.selectedpiece = e.target.id;
      main.methods.moveoptions($(this).attr('chess'));

    } else if (main.variables.selectedpiece !='' && target.name == 'null') { // move selected piece piece
      if (main.variables.highlighted.indexOf(target.id) === -1) return; // Not a legal move
      if (selectedpiece.name == 'w_king' || selectedpiece.name == 'b_king'){
        
        let t0 = (selectedpiece.name = 'w_king');
        let t1 = (selectedpiece.name = 'b_king');
        let t2 = (main.variables.pieces[selectedpiece.name].moved == false);
        let t3 = (main.variables.pieces['b_rook2'].moved == false);
        let t4 = (main.variables.pieces['w_rook2'].moved == false);
        let t5 = (target.id == '7_8');
        let t6 = (target.id == '7_1');
  
        if (t0 && t2 && t4 &&t6){ // castle w_king
  
          let k_position = '5_1';
          let k_target = '7_1';
          let r_position = '8_1';
          let r_target = '6_1';
  
          main.variables.pieces['w_king'].position = '7_1';
          main.variables.pieces['w_king'].moved = true;
          $('#'+k_position).html('');
          $('#'+k_position).attr('chess','null');
          $('#'+k_target).html(main.variables.pieces['w_king'].img);
          $('#'+k_target).attr('chess','w_king');
  
          main.variables.pieces['w_rook2'].position = '6_1';
          main.variables.pieces['w_rook2'].moved = true;
          $('#'+r_position).html('');
          $('#'+r_position).attr('chess','null');
          $('#'+r_target).html(main.variables.pieces['w_rook2'].img);
          $('#'+r_target).attr('chess','w_rook2');
  
          main.methods.endturn();
  
        } else if (t1 && t2 && t3 && t5){ // castle b_king
  
          let k_position = '5_8';
          let k_target = '7_8';
          let r_position = '8_8';
          let r_target = '6_8';
  
          // w_king
          main.variables.pieces['b_king'].position = '7_8';
          main.variables.pieces['b_king'].moved = true;
          $('#'+k_position).html('');
          $('#'+k_position).attr('chess','null');
          $('#'+k_target).html(main.variables.pieces['b_king'].img);
          $('#'+k_target).attr('chess','b_king');
  
          main.variables.pieces['b_rook2'].position = '6_8';
          main.variables.pieces['b_rook2'].moved = true;
          $('#'+r_position).html('');
          $('#'+r_position).attr('chess','null');
          $('#'+r_target).html(main.variables.pieces['b_rook2'].img);
          $('#'+r_target).attr('chess','b_rook2');
  
          main.methods.endturn();
          
        } else { // move selectedpiece
          main.methods.move(target);
          if (main.methods.isPawnPromotion(selectedpiece.name, target.id)) {
            main.methods.promptPromotion(selectedpiece.name, target.id);
          } else {
            main.methods.endturn();
          }
        }
  
      } else { // else if selecedpiece.name is not white/black king than move

        if (main.methods.isPawnPromotion(selectedpiece.name, target.id)) {
          main.methods.move(target);
          main.methods.promptPromotion(selectedpiece.name, target.id);
        } else {
          main.methods.move(target);
          main.methods.endturn();
        }
      }
        
    } else if (main.variables.selectedpiece !='' && target.name != 'null' && target.id != selectedpiece.id && selectedpiece.name.slice(0,1) != target.name.slice(0,1)){ // capture a piece
      
      if (selectedpiece.id != target.id && main.variables.highlighted.indexOf(target.id) != (-1)) { // if it's not trying to capture pieces not in its movement range
        
        // capture
        main.methods.capture(target)
        if (main.methods.isPawnPromotion(selectedpiece.name, target.id)) {
          main.methods.promptPromotion(selectedpiece.name, target.id);
        } else {
          main.methods.endturn();
        }
        
      }

    } else if (main.variables.selectedpiece !='' && target.name != 'null' && target.id != selectedpiece.id && selectedpiece.name.slice(0,1) == target.name.slice(0,1)){ // toggle move options

      // toggle
      main.methods.togglehighlight(main.variables.highlighted);
      main.variables.highlighted.length = 0;

      main.variables.selectedpiece = target.id;
      main.methods.moveoptions(target.name);

    }

  });

  $('body').contextmenu(function(e) {
    e.preventDefault();
  });

});