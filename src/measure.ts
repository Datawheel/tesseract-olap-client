import urljoin from "url-join";
import {AggregatorType} from "./common";
import Cube from "./cube";
import {Annotations, CubeChild, Named, Serializable} from "./interfaces";
import {Annotated, applyMixins} from "./mixins";

class Measure implements CubeChild, Named, Serializable {
  readonly aggregatorType: AggregatorType;
  readonly annotations: Annotations;
  readonly caption?: string;
  cube: Cube;
  readonly isMeasure: boolean = true;
  readonly name: string;

  constructor(name: string, annotations: Annotations, aggregatorType: AggregatorType) {
    this.aggregatorType = aggregatorType;
    this.annotations = annotations;
    this.name = name;
  }

  static fromJSON(json: any) {
    return new Measure(
      json["name"],
      json["annotations"],
      json["aggregator"] || AggregatorType.UNKNOWN
    );
  }

  static isMeasure(obj: any): obj is Measure {
    return Boolean(obj && obj.isMeasure);
  }

  get fullname(): string {
    return `Measures.${this.name}`;
  }

  get fullnameParts(): string[] {
    return ["Measures", this.name];
  }

  toJSON(): any {
    return {
      aggregator: this.aggregatorType,
      annotations: this.annotations,
      fullname: this.fullname,
      name: this.name,
      uri: this.toString()
    };
  }

  toString(): string {
    return urljoin(this.cube.toString(), `#/measures/${encodeURIComponent(this.name)}`);
  }
}

interface Measure extends Annotated {}

applyMixins(Measure, [Annotated]);

export default Measure;
