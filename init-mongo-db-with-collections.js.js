db = db.getSiblingDB('world');

db.createCollection('availableItems');
db.createCollection('availablePositions');
db.createCollection('unlockedPaths');
db.createCollection('placedItems');
db.createCollection('usedPositions');