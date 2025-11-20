import database from "../services/database.js";
import {
  ScanCommand,
  PutCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";
import ThreeDPrintsSchema from "../models/ThreeDPrints.js";

async function getAllThreeDPrints(req, res, next) {
  try {
    const params = {
      TableName: "ThreeDPrints",
    };
    const command = new ScanCommand(params);
    const result = await database.send(command);
    res.status(200).json(result.Items);
  } catch (err) {
    next(err);
  }
}

async function createThreeDPrints(req, res, next) {
  try {
    const uuid = uuidv4();
    req.body.id = uuid;
    const { error, value } = ThreeDPrintsSchema.validate(req.body);

    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { id, Print_Name, URL, Colours, Filament_Required } = value;

    const params = {
      TableName: "ThreeDPrints",
      Item: {
        id,
        Print_Name,
        URL,
        Colours,
        Filament_Required,
      },
    };

    const command = new PutCommand(params);

    await database.send(command);

    res
      .status(201)
      .json({ message: "Successfully created ThreeDPrints", data: params.Item });
  } catch (error) {
    next(error);
  }
}

async function getThreeDPrintsById(req, res, next) {
  const ThreeDPrintsId = req.params.id;
  try {
    const params = {
      TableName: "ThreeDPrints",
      Key: { id: ThreeDPrintsId },
    };
    const command = new GetCommand(params);
    const result = await database.send(command);
    if (!result.Item) {
      return res.status(404).json({ message: "No 3DPrint found" });
    }
    res.status(200).json(result.Item);
  } catch (err) {
    next(err);
  }
}

async function updateThreeDPrintsById(req, res, next) {
  try {
    const ThreeDPrintsId = req.params.id;
    req.body.id = ThreeDPrintsId;
    const { error, value } = ThreeDPrintsSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { Print_Name, URL, Colours, Filament_Required } = value;

    // Get the movie from DynamoDB
    const getParams = {
      TableName: "ThreeDPrints",
      Key: { id: ThreeDPrintsId },
    };

    const getCommand = new GetCommand(getParams);

    const result = await database.send(getCommand);

    const ThreeDPrints = result.Item;

    if (!ThreeDPrints) {
      return res.status(404).json({ message: "No 3DPrints found" });
    }

    // Update the ThreeDPrints in DynamoDB
    const updateParams = {
      TableName: "ThreeDPrints",
      Key: { id: ThreeDPrintsId },
      UpdateExpression:
        "set #Print_Name = :Print_Name, #URL = :URL, #Colours = :Colours, #Filament_Required = :Filament_Required",
      ExpressionAttributeNames: {
        "#Print_Name": "Print_Name",
        "#URL": "URL",
        "#Colours": "Colours",
        "#Filament_Required": "Filament_Required",
      },
      ExpressionAttributeValues: {
        ":Print_Name": Print_Name,
        ":URL": URL,
        ":Colours": Colours,
        ":Filament_Required": Filament_Required,
      },
      ReturnValues: "ALL_NEW",
    };
    const updateCommand = new UpdateCommand(updateParams);
    const updatedThreeDPrints = await database.send(updateCommand);

    res.status(200).json(updatedThreeDPrints.Attributes);
  } catch (err) {
    next(err);
  }
}

async function deleteThreeDPrintsById(req, res, next) {
  const ThreeDPrintsId = req.params.id;
  try {
    const params = {
      TableName: "ThreeDPrints",
      Key: { id: ThreeDPrintsId },
    };
    const command = new DeleteCommand(params);
    await database.send(command);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
}

export default {
  getAllThreeDPrints,
  createThreeDPrints,
  getThreeDPrintsById,
  updateThreeDPrintsById,
  deleteThreeDPrintsById,
};