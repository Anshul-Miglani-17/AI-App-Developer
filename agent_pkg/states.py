from pydantic import BaseModel,Field,ConfigDict

class File(BaseModel):
    path: str = Field(description="the path of the file")
    purpose: str = Field(description="the purpose of the file")

class Plan(BaseModel):
    name: str = Field(description="the name of the app to be built")
    description: str = Field(description="the description of the app to be built")
    technology: str = Field(description="the technology of the app to be built")
    features: list[str] = Field(description="the list of features of the app to be built")
    files: list[File] = Field(description="the list of files of the app to be built")

class Tasks(BaseModel):
    filepath: str = Field(description="the path of the file which needs to be implemented")
    task_description: str = Field(description="the description and implementation of the task in depth")

class Architecture(BaseModel):
    file_architects: list[Tasks] = Field(description="lists of files and their implementation")
    model_config = ConfigDict(extra="allow")