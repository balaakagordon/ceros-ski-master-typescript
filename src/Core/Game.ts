/**
 * The main game class. This initializes the game as well as runs the game/render loop and initial handling of input.
 */

import {
    GAME_CANVAS,
    GAME_WIDTH,
    GAME_HEIGHT,
    IMAGES,
    KEYS,
    OBSTACLE_FREQUENCY_INCREASE_THRESHOLD
} from "../Constants";
import { Canvas } from './Canvas';
import { ImageManager } from "./ImageManager";
import { Position, Rect } from './Utils';
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rhino } from "../Entities/Rhino";
import { Skier} from "../Entities/Skier";

/**
 * The different states the game can be in.
 */
enum STATES {
    STATE_PLAYING = 'playing',
    STATE_PAUSED = 'paused'
};

/**
 * The screen coordinates of the metadata which contains the game score and the pause and reset instructions.
 */
const GAME_METADATA_X: number = 30;
const RESET_TEXT_Y: number = 70;
const PAUSE_TEXT_Y: number = 100;
const SCORE_TEXT_Y: number = 130;

export class Game {
    /**
     * The canvas the game will be displayed on
     */
    private canvas!: Canvas;

    /**
     * What state the game is currently in.
     */
    private state: STATES = STATES.STATE_PLAYING;

    /**
     * The current score of the player.
     */
    private currentScore: number = 0;

    /**
     * Coordinates denoting the active rectangular space in the game world
     * */
    private gameWindow!: Rect;

    /**
     * Current game time
     */
    private gameTime: number = Date.now();

    private imageManager!: ImageManager;

    private obstacleManager!: ObstacleManager;

    /**
     * The skier player
     */
    private skier!: Skier;

    /**
     * The enemy that chases the skier
     */
    private rhino!: Rhino;

    /**
     * Initialize the game and setup any input handling needed.
     */
    constructor() {
        this.init();
        this.setupInputHandling();
    }

    /**
     * Create all necessary game objects and initialize them as needed.
     */
    init() {
        this.canvas = new Canvas(GAME_CANVAS, GAME_WIDTH, GAME_HEIGHT);
        this.imageManager = new ImageManager();
        this.obstacleManager = new ObstacleManager(this.imageManager, this.canvas);

        this.skier = new Skier(0, 0, this.imageManager, this.obstacleManager, this.canvas);
        this.rhino = new Rhino(-500, -2000, this.imageManager, this.canvas);

        this.calculateGameWindow();
        this.obstacleManager.placeInitialObstacles();
    }

    /**
     * Is the game currently in the playing state
     */
    isPlaying(): boolean {
        return this.state === STATES.STATE_PLAYING;
    }

    /**
     * Is the game currently in the paused state
     */
    isPaused(): boolean {
        return this.state === STATES.STATE_PAUSED;
    }

    /**
     * If the game is currently playing then put it in the paused state. And if it is currently paused then put it in the playing state.
     */
    pauseOrResume() {
        if(this.isPlaying()) {
            this.state = STATES.STATE_PAUSED;
        } else if(this.isPaused()) {
            this.state = STATES.STATE_PLAYING;
            this.run();
        }
    }

    /**
     * Reset the game
     */
    reset() {
        location.reload();
    }

    /**
     * Setup listeners for any input events we might need.
     */
    setupInputHandling() {
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    /**
     * Handle keyboard input for game controls.
     */
    handleInput(inputKey: string) {
        let handled: boolean = true;

        switch(inputKey) {
            case KEYS.PAUSE:
                this.pauseOrResume();
                break;
            case KEYS.RESET:
                this.reset();
                break;
            default:
                handled = false;
        }

        return handled;
    }

    /**
     * Load any assets we need for the game to run. Return a promise so that we can wait on something until all assets
     * are loaded before running the game.
     */
    async load(): Promise<void> {
        await this.imageManager.loadImages(IMAGES);
    }

    /**
     * The main game loop. If the game is in the playing state then clear the screen, update the game objects and current score, and then draw them.
     * If the game is in the paused state then draw the pause icon.
     */
    run() {
        if (this.isPlaying()) {
            this.canvas.clearCanvas();
    
            this.updateGameWindow();
            this.updateCurrentScore();
            this.drawGameWindow();
    
            requestAnimationFrame(this.run.bind(this));
        }

        if(this.isPaused()) {
            this.drawPauseIcon();
        }
    }

    /**
     * Update the current score if the skier is moving downwards.
     */
    updateCurrentScore() {
        if(this.skier.isMovingDownwards()) {
            this.currentScore++;
        }
    }

    /**
     * Do any updates needed to the game objects
     */
    updateGameWindow() {
        this.gameTime = Date.now();

        const previousGameWindow: Rect = this.gameWindow;
        this.calculateGameWindow();

        // Progressively increase the obstacle frequency, as the player's score increases
        if(this.currentScore % OBSTACLE_FREQUENCY_INCREASE_THRESHOLD === 0) {
            this.obstacleManager.increaseObstaclePlacementChance();
        }

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow);

        this.skier.update(this.gameTime, this.currentScore);
        this.rhino.update(this.gameTime, this.currentScore, this.skier);
    }

    /**
     * Draw all entities to the screen, in the correct order. Also setup the canvas draw offset so that we see the
     * rectangular space denoted by the game window.
     */
    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);
        this.drawGameMetadata();

        this.skier.draw();
        this.rhino.draw();
        this.obstacleManager.drawObstacles();
    }

    /**
     * Draw the game's metadata which includes instructions for the player to pause or reset the game, as well as the current game score.
     */
    drawGameMetadata() {
        this.canvas.ctx.font = 'bold 24px monospace';
        this.canvas.ctx.fillText(`Press ${KEYS.RESET} to reset`, GAME_METADATA_X, RESET_TEXT_Y);
        this.canvas.ctx.fillText(`Press ${KEYS.PAUSE} to pause`, GAME_METADATA_X, PAUSE_TEXT_Y);
        this.canvas.ctx.fillText("Score: " + this.currentScore, GAME_METADATA_X, SCORE_TEXT_Y);
    }

    /**
     * Draw the pause icon. It is slightly offset from the center so that it does not block view of the skier.
     */
    drawPauseIcon() {
        const pauseIconOffset = 30;
        const pauseIconWidth = 40;
        const pauseIconHeight = 80;
        const x1 = (GAME_WIDTH / 2) - pauseIconOffset;
        const x2 = (GAME_WIDTH / 2) + pauseIconOffset;
        const y = (GAME_HEIGHT / 2) + pauseIconOffset;
        this.canvas.ctx.lineWidth = 10;
        this.canvas.ctx.fillRect(x1, y, pauseIconWidth, pauseIconHeight);
        this.canvas.ctx.fillRect(x2, y, pauseIconWidth, pauseIconHeight);
    }

    /**
     * Calculate the game window (the rectangular space drawn to the screen). It's centered around the player and must
     * be updated since the player moves position.
     */
    calculateGameWindow() {
        const skierPosition: Position = this.skier.getPosition();
        const left: number = skierPosition.x - (GAME_WIDTH / 2);
        const top: number = skierPosition.y - (GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + GAME_WIDTH, top + GAME_HEIGHT);
    }

    /**
     * Handle keypresses and delegate to any game objects that might have key handling of their own.
     */
    handleKeyDown(event: KeyboardEvent) {
        const handledByGame: boolean = this.handleInput(event.key);
        const handledBySkier: boolean = this.isPlaying() && this.skier.handleInput(event.key);

        if(handledByGame || handledBySkier) {
            event.preventDefault();
        }
    }
}