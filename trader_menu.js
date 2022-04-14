function init(e){
    e.npc.setHome(-92, 63, 86)
}

var playerIDs = {"Liber" : 1, "Vanya" : 2, "Veles" : 3}
var playerAmount = {"Liber" : 1, "Vanya" : 1, "Veles" : 1}
var buttons = {}
var tradeMenuX = 50
var tradeMenuY = 20
var stepX = 35
var stepY = 30
var startId = 20

var products = [
    {"item" : "minecraft:apple",
    "itemPNG" : "customnpcs:textures/gui/osees.craft/item_slots/apple.png",
    "hoverText" : ["§aСвежее яблоко", "Действительно свежее яблоко", "на вид очень сочное"],
    "buy" : 50,
    "sell" : 30}, 
    {"item" : "minecraft:wheat",
    "itemPNG" : "customnpcs:textures/gui/osees.craft/item_slots/wheat.png",
    "hoverText" : ["§aПшеница", "Подойдет для изготовления хлеба", "и на корм животным"],
    "buy" : 40,
    "sell" : 20}, 
    {"item" : "minecraft:beetroot",
    "itemPNG" : "customnpcs:textures/gui/osees.craft/item_slots/beetroot.png",
    "hoverText" : ["§aСвекла", "Идеально для борща", "можно и пожарить"],
    "buy" : 40,
    "sell" : 20}, 
    {"item" : "minecraft:bread",
    "itemPNG" : "customnpcs:textures/gui/osees.craft/item_slots/bread.png",
    "hoverText" : ["§aХлеб", "Свежий", "так и хочеться откусить корочку"],
    "buy" : 80,
    "sell" : 40},
    {"item" : "minecraft:melon",
    "itemPNG" : "customnpcs:textures/gui/osees.craft/item_slots/melon.png",
    "hoverText" : ["§aАрбуз", "На вид очень сочный"],
    "buy" : 15,
    "sell" : 9},
    {"item" : "minecraft:cookie",
    "itemPNG" : "customnpcs:textures/gui/osees.craft/item_slots/cookie.png",
    "hoverText" : ["§aПеченье", "Нет ничего лучше чем печеньки"],
    "buy" : 10,
    "sell" : 5},
    {"item" : "minecraft:fish",
    "itemPNG" : "customnpcs:textures/gui/osees.craft/item_slots/fish_cod_raw.png",
    "hoverText" : ["§aСырая треска", "Употребление сырой пищи вредит вашему здоровью"],
    "buy" : 40,
    "sell" : 15},
    {"item" : "minecraft:cooked_fish",
    "itemPNG" : "customnpcs:textures/gui/osees.craft/item_slots/fish_cod_cooked.png",
    "hoverText" : ["§aЖаренная треска", "Остаеться надеться,", "что не будет костей"],
    "buy" : 70,
    "sell" : 30},
    {"item" : "minecraft:beef",
    "itemPNG" : "customnpcs:textures/gui/osees.craft/item_slots/raw_beef.png",
    "hoverText" : ["§aБифштекс", "Употребление сырой пищи вредит вашему здоровью"],
    "buy" : 40,
    "sell" : 15}
]

var id = 13
function dialogClose(event){

    if (event.dialog.id == id) {
        var playerName = event.player.getName()
        var timerID = playerIDs[playerName]
        event.npc.timers.forceStart(timerID, 0.1, false) 
    }
}

function timer(event){
    var keys = Object.keys(playerIDs)
    var playerName = keys[event.id - 1]
    openTradeGUI(event, playerName)
}

function openTradeGUI(event, playerName){

    var ginar = event.API.executeCommand(event.npc.world, "papi parse " + playerName + " %vault_eco_balance%").slice(0,-1)
    var ephir = event.API.executeCommand(event.npc.world, "papi parse " + playerName + " %playerpoints_points%").slice(0,-1)
    
    var gui = event.API.createCustomGui(1,300,300,false);
    var player = event.npc.world.getPlayer(playerName)
    gui.addTexturedButton(2, "", 40, 180, 20, 10, "customnpcs:textures/gui/osees.craft/gui/button+1.png", 0, 0);
    gui.addTexturedButton(3, "", 65, 180, 20, 10, "customnpcs:textures/gui/osees.craft/gui/button+10.png", 0, 0);
    gui.addTexturedButton(4, "", 90, 180, 20, 10, "customnpcs:textures/gui/osees.craft/gui/button+20.png", 0, 0);
    gui.addTexturedButton(5, "", 115, 180, 20, 10, "customnpcs:textures/gui/osees.craft/gui/buttonset1.png", 0, 0);
    gui.addTexturedButton(6, "", 140, 180, 20, 10, "customnpcs:textures/gui/osees.craft/gui/buttonset32.png", 0, 0);
    gui.addTexturedButton(7, "", 165, 180, 20, 10, "customnpcs:textures/gui/osees.craft/gui/buttonset64.png", 0, 0);
    gui.addTexturedButton(8, "", 190, 180, 20, 10, "customnpcs:textures/gui/osees.craft/gui/button-20.png", 0, 0);
    gui.addTexturedButton(9, "", 215, 180, 20, 10, "customnpcs:textures/gui/osees.craft/gui/button-10.png", 0, 0);
    gui.addTexturedButton(10, "", 240, 180, 20, 10, "customnpcs:textures/gui/osees.craft/gui/button-1.png", 0, 0);
    gui.addLabel(11, "Необходимое количесво товара:§l " + playerAmount[playerName], 65, 165, 200, 10);
    gui.addLabel(12, "§l" + ginar, 10, 210, 100, 20)
    gui.addLabel(13, "§l" + ephir, 10, 237, 100, 20)
    gui.addLabel(14, "§l0", 14, 264, 100, 20);
    gui.addLabel(15, "В данный момент акций нет!", -80, 10, 85, 60);
    gui.addLabel(16, "Арбуз со скидкой! 15 гинар за штуку", -80, 75, 85, 60);
    gui.addLabel(17, "Новость дня: мы открылись!", -80, 135, 85, 60);
    
    var flowId = 0
    
    for(var i in products){
        var item = products[i]
        var buttonId1 = startId + flowId + 1
        var buttonId2 = startId + flowId + 2
        var itemId = startId + flowId + 3
        var y = tradeMenuY + Math.floor(flowId/18)*stepY
        var x = tradeMenuX + flowId/3*stepX - Math.floor(flowId/18)*6*stepX
        flowId = flowId + 3
        createTradeItem(event, gui, x, y, buttonId1, buttonId2, playerAmount[playerName], itemId, item["item"], item["itemPNG"], item["hoverText"], item["buy"], item["sell"])
    }
    
    gui.addTexturedRect(1, "customnpcs:textures/gui/osees.craft/gui/trader_gui.png", -100, 0, 256, 256, 0, 0)
    gui.getComponent(1).setScale(2)
    gui.showPlayerInventory(-13, 140)
    
    player.showCustomGui(gui);
}

function customGuiButton(event){
    var playerName = event.player.getName()
    var amount = playerAmount[playerName]
    var ginar = event.API.executeCommand(event.player.world, "papi parse " + playerName + " %vault_eco_balance%").slice(0,-1)

    var buttonOptions = buttons[event.buttonId]
    if(buttonOptions != null){
        ginar = parseFloat(ginar)
        var item =  event.player.world.createItem(buttonOptions[1], 0, 1)
        item.setStackSize(amount)
        var price = buttonOptions[2]
        
        if(buttonOptions[0] == true){
            if(ginar < price * amount){
                event.player.message("недостаточно валюты")
            }
            else{
                event.API.executeCommand(event.player.world, "eco take " + playerName + " " + price * amount)
                event.player.giveItem(item)
                ginar = ginar - price * amount
            }
        }
        else if(buttonOptions[0] == false){
            var inventory = event.player.getInventory()
            var countItem = inventory.count(item, false, false)
            if(countItem>=amount){
                var remove = event.player.removeItem(item, amount)
                if(remove){
                    event.API.executeCommand(event.player.world, "eco give " + playerName + " " + price * amount)
                    ginar = ginar + price * amount
                }
                else{
                    event.player.message("Недостаточно товара")
                }
            }
            else{
                event.player.message("Недостаточно товара")
            }    
        }
    }
    else if(event.buttonId >= 2  && event.buttonId <=10){
        if(event.buttonId == 2){
            amount++
        }
        if(event.buttonId == 3){
            amount = amount + 10
        }
        if(event.buttonId == 4){
            amount = amount + 20
        }
        if(event.buttonId == 5){
            amount = 1
        }
        if(event.buttonId == 6){
            amount = 32
        }
        if(event.buttonId == 7){
            amount = 64
        }
        if(event.buttonId == 8){
            amount = amount - 20
        }
        if(event.buttonId == 9){
            amount = amount - 10
        }
        if(event.buttonId == 10){
            amount--
        }
        if(amount < 1){amount = 1}
        else if(amount > 64){amount = 64}
        priceUpdate(event.gui, amount, playerName)
    }
    
    event.gui.addLabel(12, "§l" + ginar, 10, 210, 100, 20)
    event.gui.update(event.player)
}

function priceUpdate(gui, amount, playerName){
    playerAmount[playerName] = amount
    var keys = Object.keys(buttons)
    for(var i in keys){
        var buy = buttons[keys[i]][0]
        var price = buttons[keys[i]][2]
        if(buy == true){
            gui.getComponent(keys[i]).setHoverText("§aКупить " + amount + "шт. за " + price*amount + " Гинар");
        }
        else if(buy == false){
            gui.getComponent(keys[i]).setHoverText("§cПродать " + amount + "шт. за " + price*amount + " Гинар");
        }
    }
    gui.addLabel(11, "Необходимое количесво товара:§l " + amount, 65, 165, 200, 10);
}

function createTradeItem(event, gui, x, y, buttonPlusId, buttonMinusId, amountItem, itemId, item, itemPNG, textItem, buy, sell){
    gui.addTexturedRect(itemId, itemPNG, x+10, y+2, 18, 18, 0, 0)
    gui.getComponent(itemId).setHoverText(textItem);
    
    gui.addTexturedButton(buttonPlusId, "", x, y, 10, 10, "customnpcs:textures/gui/osees.craft/gui/button2_plus.png", 0, 0);
    gui.getComponent(buttonPlusId).setHoverText("§aКупить " + amountItem + "шт. за " + buy*amountItem + " Гинар");
    
    gui.addTexturedButton(buttonMinusId, "", x, y+12, 10, 10, "customnpcs:textures/gui/osees.craft/gui/button2_minus.png", 0, 0);
    gui.getComponent(buttonMinusId).setHoverText("§cПродать " + amountItem + "шт. за " + sell*amountItem + " Гинар");
    
    buttons[buttonPlusId] = [true, item, buy]
    buttons[buttonMinusId] = [false, item, sell]
    
}