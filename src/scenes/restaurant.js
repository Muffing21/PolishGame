class restaurant extends Phaser.Scene {
    constructor() {
        super('restaurantScene');
    }

    preload(){
        //menu bgm
        this.load.audio('sfx', './assets/pickup.wav')

        //pickup bgm
        this.load.audio('menu_bgm','./assets/t.wav');

    }

    create(data) {

        //we need to make variables and stuff for collecting thee ingredients
        //this.pick_up_music = this.sound.add('pickup', {mute: false, volume: 0.2, rate: 1, loop: false});

        //add background music
        this.music = this.sound.add('menu_bgm', {mute: false, volume: 1.0, rate: 1, loop: true});
        this.music.play();

        this.sfx = this.sound.add('sfx', {mute: false, volume: 1.0, rate: 1, loop: false});   


        // variables and settings
        this.AVATAR_SCALE = 0.25;
        this.VELOCITY = 450;
        this.ROOMWIDTH = 1024;
        this.ROOMHEIGHT = 672;
        this.recipeUnlocked = false;
        this.foodCounter = 0;
        this.gotFlour = false;
        this.gotMilk = 0;
        this.gotEgg = 0;
        this.gotSoda = false;
        this.gotSugar = false;
        this.gotPowder = false;
        this.gotSalt = false;
        this.gotVanilla = false;
        this.block = this.add.group();

        this.time = 0;
        
        //timer
        if(data > 0){
            this.time = data; 
        }

        
        

        // Set background color
        
        this.cameras.main.setBackgroundColor('#666');

        // Set main camera to be 3 rooms wide, 2 rooms tall
        this.cameras.main.setBounds(0, 0, this.ROOMWIDTH*3, this.ROOMHEIGHT*2);

        // Everything is 1:1 scale
        this.cameras.main.setZoom(1.0);
    
        // setScroll moves the viewport to the starting room (1 down, 1 over)
        this.cameras.main.setScroll(this.ROOMWIDTH, this.ROOMHEIGHT);


        // Add overworld background images
        //this.add.image(0, this.ROOMHEIGHT, 'LoZ-overworld-left').setOrigin(0);
        this.invisBlock = this.physics.add.image(this.ROOMWIDTH*1.5, (this.ROOMHEIGHT*1.5)+50, 'invisBlock');
         this.invisBlock.body.immovable = true;
         this.invisBlock.body.allowGravity = false;
        this.block.add(this.invisBlock);

        this.invisBlock2 = this.physics.add.image(this.ROOMWIDTH*1.5-500, (this.ROOMHEIGHT*1.5)-200, 'invisBlock');
         this.invisBlock2.body.immovable = true;
         this.invisBlock2.body.allowGravity = false;
        this.block.add(this.invisBlock2);

        this.invisBlock3 = this.physics.add.image(this.ROOMWIDTH*1.5-500, (this.ROOMHEIGHT*1.5)-300, 'invisBlock');
         this.invisBlock3.body.immovable = true;
         this.invisBlock3.body.allowGravity = false;
        this.block.add(this.invisBlock3);

        this.invisBlock4 = this.physics.add.image(this.ROOMWIDTH*1.5+500, (this.ROOMHEIGHT*1.5)-300, 'invisBlock');
         this.invisBlock4.body.immovable = true;
         this.invisBlock4.body.allowGravity = false;
        this.block.add(this.invisBlock4);

        this.invisBlock5 = this.physics.add.image(this.ROOMWIDTH*1.5+500, (this.ROOMHEIGHT*1.5)-200, 'invisBlock');
         this.invisBlock5.body.immovable = true;
         this.invisBlock5.body.allowGravity = false;
        this.block.add(this.invisBlock5);

        this.invisBlock6 = this.physics.add.image(this.ROOMWIDTH*1.5-500, (this.ROOMHEIGHT*1.5)+200, 'invisBlock');
         this.invisBlock6.body.immovable = true;
         this.invisBlock6.body.allowGravity = false;
        this.block.add(this.invisBlock6);
        
        this.invisBlock7 = this.physics.add.image(this.ROOMWIDTH*1.5+500, (this.ROOMHEIGHT*1.5)+200, 'invisBlock');
         this.invisBlock7.body.immovable = true;
         this.invisBlock7.body.allowGravity = false;
        this.block.add(this.invisBlock7);

        this.add.image(this.ROOMWIDTH, this.ROOMHEIGHT, 'restaurant').setOrigin(0);
        
        this.invisBlock8 = this.physics.add.image(this.ROOMWIDTH, (this.ROOMHEIGHT*1.5)+200, 'invisBlock2');
         this.invisBlock8.body.immovable = true;
         this.invisBlock8.body.allowGravity = false;
        this.block.add(this.invisBlock8);
        
        
        
        //this.add.image(this.ROOMWIDTH*2, this.ROOMHEIGHT, 'LoZ-overworld-right').setOrigin(0);
        //this.add.image(0, 0, 'LoZ-overworld-upleft').setOrigin(0);
        this.add.image(this.ROOMWIDTH, 0, 'kitchen').setOrigin(0);
        // this.add.image(this.ROOMWIDTH*2, 0, 'LoZ-overworld-upright').setOrigin(0);

        // Set up animations

        // make player avatar and animations
        this.player = this.physics.add.sprite(this.ROOMWIDTH*1.5, this.ROOMHEIGHT*1.5-200, 'idle').setScale(this.AVATAR_SCALE);
        this.player.body.allowGravity = false;
        this.player.body.setCollideWorldBounds(true);
        this.player.body.onWorldBounds = true;
        this.playerCollide = this.add.group();
        this.playerCollide.add(this.player);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('idle', {frames: [0, 1]}),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_down',
            frames: this.anims.generateFrameNumbers('walk_down', {frames: [0, 1, 2, 3]}),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_left',
            frames: this.anims.generateFrameNumbers('walk_left', {frames: [0, 1, 2, 3]}),
            framerate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_right',
            frames: this.anims.generateFrameNumbers('walk_right', {frames: [0, 1, 2, 3]}),
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'walk_up',
            frames: this.anims.generateFrameNumbers('walk_up', {frames: [0, 1, 2, 3]}),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'milk',
            frames: this.anims.generateFrameNumbers('milk', {frames: [0, 1, 2, 3]}),
            framerate: 4,
            repeat: 0
        });

        this.anims.create({
            key: 'egg',
            frames: this.anims.generateFrameNumbers('egg', {frames: [0, 1, 2]}),
            framerate: 3,
            repeat: 0
        });

        this.anims.create({
            key: 'salt',
            frames: this.anims.generateFrameNumbers('salt', {frames: [0, 1, 2, 3]}),
            framerate: 4,
            repeat: 0
        });

        this.anims.create({
            key: 'soda',
            frames: this.anims.generateFrameNumbers('soda', {frames: [0, 1, 2, 3]}),
            framerate: 4,
            repeat: 0
        });

        this.anims.create({
            key: 'vanilla',
            frames: this.anims.generateFrameNumbers('vanilla', {frames: [0, 1, 2, 3]}),
            framerate: 4,
            repeat: 0
        });

        this.anims.create({
            key: 'flour',
            frames: this.anims.generateFrameNumbers('flour', {frames: [0, 1, 2, 3]}),
            framerate: 4,
            repeat: 0
        });

        this.anims.create({
            key: 'bp',
            frames: this.anims.generateFrameNumbers('bp', {frames: [0, 1, 2, 3]}),
            framerate: 4,
            repeat: 0
        });

        this.anims.create({
            key: 'sugar',
            frames: this.anims.generateFrameNumbers('sugar', {frames: [0, 1, 2, 3]}),
            framerate: 4,
            repeat: 0
        });

        

        //make collision group
        

        //make collision blocks
        // this.solidBlock = this.physics.add.image(this.ROOMWIDTH-this.player.displayWidth/2, this.ROOMHEIGHT-this.player.displayHeight/2, 'block').setOrigin(0);
        // this.solidBlock.body.immovable = true;
        // this.solidBlock.body.allowGravity = false;
        // this.block.add(this.solidBlock);

        // this.solidBlock2 = this.physics.add.image(this.ROOMWIDTH+this.player.displayWidth*18, this.ROOMHEIGHT+this.player.displayHeight/2, 'block');
        // this.solidBlock2.body.immovable = true;
        // this.solidBlock2.body.allowGravity = false;
        // this.block.add(this.solidBlock2);

        //this.recipeCollide = this.add.group();
        this.recipe = this.physics.add.image(this.ROOMWIDTH*1.5, (this.ROOMHEIGHT*1.5)+235, 'chef').setScale(this.AVATAR_SCALE);
         this.recipe.body.immovable = true;
         this.recipe.body.allowGravity = false;
        //this.recipeCollide.add(this.recipe);

        // this.Fridge1 = this.physics.add.image(this.ROOMWIDTH-this.player.displayWidth/2, this.ROOMHEIGHT-this.player.displayHeight/2, 'block').setOrigin(0);
        // this.Fridge1.body.immovable = true;
        // this.Fridge1.body.allowGravity = false;
        // this.block.add(this.Fridge1);

        this.longWall = this.physics.add.image(this.ROOMWIDTH*1.5, (this.ROOMHEIGHT*0.5)-150, 'longWall');
        this.longWall.body.immovable = true;
        this.longWall.body.allowGravity = false;
        this.block.add(this.longWall);

        
        // this.longWall2 = this.physics.add.image(this.ROOMWIDTH*1.5, (this.ROOMHEIGHT*1.5)+150, 'longWall');
        // this.longWall2.body.immovable = true;
        // this.longWall2.body.allowGravity = false;
        // this.block.add(this.longWall2);


        //The way I did it here is the first one will be a collision solid object while the second one will be for collision check
        this.eggFridge = this.physics.add.image((this.ROOMWIDTH*1.5)-50, this.ROOMWIDTH*.05+200, 'eggFridge');
        this.eggFridge.body.immovable = true;
        this.eggFridge.body.allowGravity = false;
        this.block.add(this.eggFridge);

        this.eggFridge2 = this.physics.add.image((this.ROOMWIDTH*1.5)-50, this.ROOMWIDTH*.05+201, 'eggFridge');
        this.eggFridge2.body.immovable = true;
        this.eggFridge2.body.allowGravity = false;

        this.egg = this.physics.add.sprite((this.ROOMWIDTH*1.5)-50, this.ROOMWIDTH*.05+201, 'egg').setScale(this.AVATAR_SCALE);
        this.egg.visible = false;
        


        this.milkFridge = this.physics.add.image(this.ROOMWIDTH*1.5+100, this.ROOMWIDTH*.05+200, 'milkFridge');
        this.milkFridge.body.immovable = true;
        this.milkFridge.body.allowGravity = false;
        this.block.add(this.milkFridge);

        this.milkFridge2 = this.physics.add.image(this.ROOMWIDTH*1.5+100, this.ROOMWIDTH*.05+201, 'milkFridge');
        this.milkFridge2.body.immovable = true;
        this.milkFridge2.body.allowGravity = false;

        this.milk = this.physics.add.sprite(this.ROOMWIDTH*1.5+100, this.ROOMWIDTH*.05+201, 'milk').setScale(this.AVATAR_SCALE);
        this.milk.visible = false;


        this.flourFridge = this.physics.add.image(this.ROOMWIDTH*1.5+400, this.ROOMWIDTH*.05+400, 'flourFridge');
        this.flourFridge.body.immovable = true;
        this.flourFridge.body.allowGravity = false;
        this.block.add(this.flourFridge);

        this.flourFridge2 = this.physics.add.image(this.ROOMWIDTH*1.5+400, this.ROOMWIDTH*.05+401, 'flourFridge');
        this.flourFridge2.body.immovable = true;
        this.flourFridge2.body.allowGravity = false;

        this.flour = this.physics.add.sprite(this.ROOMWIDTH*1.5+400, this.ROOMWIDTH*.05+401, 'flour').setScale(this.AVATAR_SCALE);
        this.flour.visible = false;

        this.sugarFridge = this.physics.add.image(this.ROOMWIDTH+200, this.ROOMWIDTH*.05+400, 'sugarFridge');
        this.sugarFridge.body.immovable = true;
        this.sugarFridge.body.allowGravity = false;
        this.block.add(this.sugarFridge);

        this.sugarFridge2 = this.physics.add.image(this.ROOMWIDTH+200, this.ROOMWIDTH*.05+401, 'sugarFridge');
        this.sugarFridge2.body.immovable = true;
        this.sugarFridge2.body.allowGravity = false;

        this.sugar = this.physics.add.sprite(this.ROOMWIDTH+200, this.ROOMWIDTH*.05+401, 'sugar').setScale(this.AVATAR_SCALE);
        this.sugar.visible = false;

        this.sodaFridge = this.physics.add.image(this.ROOMWIDTH+100, this.ROOMWIDTH*.05+200, 'sodaFridge');
        this.sodaFridge.body.immovable = true;
        this.sodaFridge.body.allowGravity = false;
        this.block.add(this.sodaFridge);

        this.sodaFridge2 = this.physics.add.image(this.ROOMWIDTH+100, this.ROOMWIDTH*.05+201, 'sodaFridge');
        this.sodaFridge2.body.immovable = true;
        this.sodaFridge2.body.allowGravity = false;

        this.soda = this.physics.add.sprite(this.ROOMWIDTH+100, this.ROOMWIDTH*.05+201, 'soda').setScale(this.AVATAR_SCALE);
        this.soda.visible = false;

        this.powderFridge = this.physics.add.image(this.ROOMWIDTH+200, this.ROOMWIDTH*.05+200, 'powderFridge');
        this.powderFridge.body.immovable = true;
        this.powderFridge.body.allowGravity = false;
        this.block.add(this.powderFridge);

        this.powderFridge2 = this.physics.add.image(this.ROOMWIDTH+200, this.ROOMWIDTH*.05+201, 'powderFridge');
        this.powderFridge2.body.immovable = true;
        this.powderFridge2.body.allowGravity = false;

        this.bp = this.physics.add.sprite(this.ROOMWIDTH+200, this.ROOMWIDTH*.05+201, 'bp').setScale(this.AVATAR_SCALE);
        this.bp.visible = false;

        this.saltFridge = this.physics.add.image(this.ROOMWIDTH+100, this.ROOMWIDTH*.05+400, 'saltFridge');
        this.saltFridge.body.immovable = true;
        this.saltFridge.body.allowGravity = false;
        this.block.add(this.saltFridge);

        this.saltFridge2 = this.physics.add.image(this.ROOMWIDTH+100, this.ROOMWIDTH*.05+401, 'saltFridge');
        this.saltFridge2.body.immovable = true;
        this.saltFridge2.body.allowGravity = false;

        this.salt = this.physics.add.sprite(this.ROOMWIDTH+100, this.ROOMWIDTH*.05+401, 'salt').setScale(this.AVATAR_SCALE);
        this.salt.visible = false;

        this.vanillaFridge = this.physics.add.image(this.ROOMWIDTH+940, (this.ROOMHEIGHT*.05)+200, 'vanillaFridge');
        this.vanillaFridge.body.immovable = true;
        this.vanillaFridge.body.allowGravity = false;
        this.block.add(this.vanillaFridge);

        this.vanillaFridge2 = this.physics.add.image(this.ROOMWIDTH+940, (this.ROOMHEIGHT*.05)+201, 'vanillaFridge');
        this.vanillaFridge2.body.immovable = true;
        this.vanillaFridge2.body.allowGravity = false;
        
        this.vanilla = this.physics.add.sprite(this.ROOMWIDTH+940, (this.ROOMWIDTH*.05)+201, 'vanilla').setScale(this.AVATAR_SCALE);
        this.vanilla.visible = false;

        this.table = this.physics.add.image(this.ROOMWIDTH*1.5+260, (this.ROOMHEIGHT*0.5)-195, 'table');
        this.table.body.immovable = true;
        this.table.body.allowGravity = false;
        this.table.visible = false;
       
       
        this.collided = false;
        
        //collider
        
        //this.physics.add.collider(this.player, this.recipe);
        
        this.physics.add.collider(this.player, this.block);


        this.showRecipe = false;

        // set world boundaries
        this.physics.world.setBounds(this.ROOMWIDTH-this.player.displayWidth/2, this.ROOMHEIGHT-this.player.displayHeight/2, 
            this.ROOMWIDTH+this.player.displayWidth, this.ROOMHEIGHT+this.player.displayHeight/2);
        
            //var roomHeight = this.ROOMHEIGHT*2;
            //var roomWidth = this.ROOMWIDTH *1.5;

        this.cameras.main.shake(250);
        this.cameras.main.flash(250);
        this.physics.world.on('worldbounds', (body, blockedUp, blockedDown, blockedLeft, blockedRight) => {
            if (blockedUp) {
                this.cameras.main.pan(
                    this.ROOMWIDTH*1.5,
                    this.ROOMHEIGHT*0.5,
                    2000,
                    'Linear'
                );
                this.physics.world.setBounds(this.ROOMWIDTH-this.player.displayWidth/2, 0, 
                    this.ROOMWIDTH+this.player.displayWidth, this.ROOMHEIGHT+this.player.displayHeight/2);
                }
                
            if(blockedDown){
                this.cameras.main.pan(
                    this.ROOMWIDTH*1.5, 
                    this.ROOMHEIGHT*2,
                    2000, 
                    'Linear');
                    this.physics.world.setBounds(this.ROOMWIDTH+this.player.displayWidth/2, this.ROOMHEIGHT-this.player.displayHeight/2, 
                    this.ROOMWIDTH+this.player.displayWidth, this.ROOMHEIGHT+this.player.displayHeight/2);
                }

            
        });

        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        keyX.enabled = false;

        keyUp = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLeft = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRight = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyDown = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //instructions
        let scoreConfig = {
            fontFamily: 'Pangolin',
            fontSize: '20px',
            color: '#F8B88B',
            align: 'right',
            stroke: '#FF6700',
            strokeThickness: 6, 
            fixedWidth: 0,

            // fontFamily: 'serif',
            // fontSize: '16px',
            // backgroundColor: '#ADD8E6',
            // color: '#000000',
            // align: 'right',
            padding: {
                top: 10,
                bottom: 10,
            }, 
        }
        this.add.text(this.ROOMWIDTH*1.5 - 450, this.ROOMHEIGHT*1.5 + 250, 'Talk to the Chef. Press SPACE while in front of the Ingredients to collect!', scoreConfig);
        
        
        //timer for the player
        scoreConfig.color = '#FFFF00';
        //this.time = data;
        this.currentTime = this.add.text(this.ROOMWIDTH+20, this.ROOMHEIGHT+20, this.time, scoreConfig);
        this.currentTime2 = this.add.text(this.ROOMWIDTH+20, this.ROOMHEIGHT*.05+20, this.time, scoreConfig);
        
            
        this.recipe1 = this.add.text(this.ROOMWIDTH*1.5-300, this.ROOMHEIGHT*1.5-20, "Follow this Vanilla Cake Recipe:", scoreConfig)
        this.recipe2 = this.add.text(this.ROOMWIDTH*1.5-300, this.ROOMHEIGHT*1.5+50, "2x milk\n1x flour\n2x egg\n1x salt\n1x vanilla\n1x milk\n1x sugar\n1x soda\n1x powder", scoreConfig)
        this.recipe3 = this.add.text(this.ROOMWIDTH*1.5-200, this.ROOMHEIGHT*1.5+30, "Press 'z' to back", scoreConfig).setOrigin(0.5)
        this.recipe1.visible = false;
            this.recipe2.visible = false;
            this.recipe3.visible = false;

    }

    update(time, delta) {
        //increase timer
        this.time += delta;
        this.currentTime.text = (this.time/1000).toFixed(2);
        this.currentTime2.text = (this.time/1000).toFixed(2);
            
                

        this.player.anims.play('idle');

        let scoreConfig = {
            fontFamily: 'Pangolin',
            fontSize: '20px',
            color: '#F8B88B',
            align: 'right',
            stroke: '#FF6700',
            strokeThickness: 6, 
            fixedWidth: 0,
            padding: {
                top: 10,
                bottom: 10,
            }, 
            //fixedWidth: 
        }

        // check keyboard input
        if(cursors.left.isDown) {
            this.player.body.setVelocity(-this.VELOCITY, 0);
            this.player.anims.play('walk_left', true);


        } 
        
        else if(cursors.right.isDown) {
            this.player.body.setVelocity(this.VELOCITY, 0);
           this.player.anims.play('walk_right');

        } else if(cursors.up.isDown) {
            this.player.body.setVelocity(0, -this.VELOCITY);
            this.player.anims.play('walk_up', true);

        } else if(cursors.down.isDown) {
            this.player.body.setVelocity(0, this.VELOCITY);
            this.player.anims.play('walk_down', true);

        } else if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
            this.player.body.setVelocity(0, 0);

            // if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'run_left') {
            //     //this.player.anims.play('idle_left');
            // }
            // if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'run_right') {
            //    //this.player.anims.play('idle_right');
            // }
            // if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'run_up') {
            //     //this.player.anims.play('idle_up');
            // }
            // if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'run_down') {
            //     //this.player.anims.play('idle_down');
            // }
        }

        //create some kind of counter to track the player's ingredients collected
        if(this.physics.overlap(this.player, this.milkFridge2)  && Phaser.Input.Keyboard.JustDown(keySPACE) && this.gotMilk != 2){
            console.log("Got the milk");
            this.foodCounter += 1;
            this.gotMilk += 1;
            this.milk.visible = true;
            this.milk.anims.play('milk');
            this.milk.once('animationcomplete', () => {
                this.milk.visible = false;
            })
           // this.milk.visible = false;
            this.sfx.play();
        }

        if(this.physics.overlap(this.player, this.eggFridge2)  && Phaser.Input.Keyboard.JustDown(keySPACE) && this.gotEgg != 2){
            console.log("Got the egg");
            this.foodCounter += 1;
            this.gotEgg += 1;
            this.egg.visible = true;
            this.egg.anims.play('egg');
            this.egg.once('animationcomplete', () => {
                this.egg.visible = false;
            })
            this.sfx.play();
        }

        if(this.physics.overlap(this.player, this.flourFridge2)  && Phaser.Input.Keyboard.JustDown(keySPACE) && this.gotFlour == false){
            console.log("Got the Flour");
            this.foodCounter += 1;
            this.gotFlour = true;
            this.flour.visible = true;
            this.flour.anims.play('flour');
            this.flour.once('animationcomplete', () => {
                this.flour.visible = false;
            })
            this.sfx.play();
        }

        if(this.physics.overlap(this.player, this.sugarFridge2)  && Phaser.Input.Keyboard.JustDown(keySPACE) && this.gotSugar == false){
            console.log("Got the Sugar");
            this.foodCounter += 1;
            this.gotSugar = true;
            this.sugar.visible = true;
            this.sugar.anims.play('sugar');
            this.sugar.once('animationcomplete', () => {
                this.sugar.visible = false;
            })
            this.sfx.play();
        }

        if(this.physics.overlap(this.player, this.powderFridge2)  && Phaser.Input.Keyboard.JustDown(keySPACE) && this.gotPowder == false){
            console.log("Got the Powder");
            this.foodCounter += 1;
            this.gotPowder = true;
            this.bp.visible = true;
            this.bp.anims.play('bp');
            this.bp.once('animationcomplete', () => {
                this.bp.visible = false;
            })
            this.sfx.play();
        }

        if(this.physics.overlap(this.player, this.sodaFridge2)  && Phaser.Input.Keyboard.JustDown(keySPACE) && this.gotSoda == false){
            console.log("Got the soda");
            this.foodCounter += 1;
            this.gotSoda = true;
            this.soda.visible = true;
            this.soda.anims.play('soda');
            this.soda.once('animationcomplete', () => {
                this.soda.visible = false;
            })
            this.sfx.play();
        }

        if(this.physics.overlap(this.player, this.saltFridge2)  && Phaser.Input.Keyboard.JustDown(keySPACE) && this.gotSalt == false){
            console.log("Got the salt");
            this.foodCounter += 1;
            this.gotSalt = true;
            this.salt.visible = true;
            this.salt.anims.play('salt');
            this.salt.once('animationcomplete', () => {
                this.salt.visible = false;
            })
            this.sfx.play();
        }

        if(this.physics.overlap(this.player, this.vanillaFridge2)  && Phaser.Input.Keyboard.JustDown(keySPACE) && this.gotVanilla == false){
            console.log("Got the vanilla");
            this.foodCounter += 1;
            this.gotVanilla = true;
            this.vanilla.visible = true;
            this.vanilla.anims.play('vanilla');
            this.vanilla.once('animationcomplete', () => {
                this.vanilla.visible = false;
            })
            this.sfx.play();
        }
        
        if(this.physics.overlap(this.player, this.recipe)){
            this.recipe1.visible = true;
            this.recipe2.visible = true;
            this.recipe3.visible = true;

            this.player.body.setVelocity(0, 0);
            
            if(Phaser.Input.Keyboard.JustDown(keyZ)){
                //this.music.stop();
                this.recipe1.visible = false;
                this.recipe2.visible = false;
                this.recipe3.visible = false;
                this.player.setPosition(this.ROOMWIDTH*1.5, this.ROOMHEIGHT*1.5-200);
                this.recipeUnlocked = true;
                keyX.enabled = true;
                //this.scene.start('restaurantScene', data);
            }
        }

        if(this.recipeUnlocked == true && Phaser.Input.Keyboard.JustDown(keyX) && keyX.enabled == true){
            this.recipe1.visible = true;
            this.recipe2.visible = true;
            this.recipe3.visible = true;
            this.recipeUnlocked = false;
        }

        if(this.recipeUnlocked == false && Phaser.Input.Keyboard.JustDown(keyX) && keyX.enabled == true){
            this.recipe1.visible = false;
            this.recipe2.visible = false;
            this.recipe3.visible = false;
            this.recipeUnlocked = true;
        }


        //instead of starting a new scene right away, add a new image to the location of the oven with a yellow highlight around it and player must collide with it
        if (this.foodCounter == 10) {
            this.table.visible = true;
            if(this.physics.overlap(this.player, this.table)){
                this.music.stop();
                this.table.visible = false;
                this.scene.start('ingredientsScene', this.time);
            }
            
            //code for baking scene
            
        }

        // wrap physics object(s) .wrap(gameObject, padding)
        this.physics.world.wrap(this.player, 0);
    }
}
